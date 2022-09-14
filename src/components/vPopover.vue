<template>
  <slot
    name="reference"
    v-bind="referenceSlotProps"
    :is-open="isPopperVisible"
  ></slot>

  <teleport to="body">
    <transition
      :name="transition"
      @after-leave="onPopperTransitionLeave"
    >
      <div
        v-if="isPopperVisible"
        ref="popper"
      >
        <slot
          name="default"
          :hide="hide"
          v-bind="contextData"
        ></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
// vue
import { ref, toRef, toRefs, onBeforeUnmount, provide } from "vue";
// composition
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import useTrigger from "./composition/use-trigger";
// props
import {
  sharedProps,
  sharedPopperProps,
  sharedStyleProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";
// trigger
import { registerListener, removeListener } from "../trigger";

export default {
  props: {
    ...sharedProps(),
    ...sharedPopperProps("popover"),
    trigger: {
      type: String,
      default: "click",
    },
    noHeader: {
      type: Boolean,
      default: defaultProps("popover", "noHeader", false),
    },
    title: {
      type: String,
      default: undefined,
    },
    transition: {
      type: String,
      default: defaultProps("popover", "transition", "fade"),
    },
    styleHeader: {
      type: String,
      default: defaultProps("popover", "stylePopover", ""),
    },
    ...sharedStyleProps("popover"),
  },
  inheritAttrs: false,
  setup(props, { slots, emit, expose, attrs }) {
    let { classes } = useStyles("popover", props, {
      header: null,
    });

    const { offsetX, offsetY, noFlip, placement, trigger } = toRefs(props);

    // popper
    const {
      isPopperVisible,
      reference,
      popper,
      showPopper,
      hidePopper,
      onPopperTransitionLeave,
      updateVirtualElement,
    } = usePopper({ placement, offsetX, offsetY, noFlip, emit });

    // click outside
    let { onClickOutside } = useClickOutside();
    let stopClickOutside = null;

    let show = () => {
      if (isPopperVisible.value) return;
      showPopper();
      if (props.trigger === "click") {
        stopClickOutside = onClickOutside(popper, hide, reference);
      }
    };

    let hide = () => {
      if (!isPopperVisible.value) return;
      hidePopper();
      if (stopClickOutside) stopClickOutside = stopClickOutside();
    };

    let { onTrigger } = useTrigger(trigger, show, hide);

    let referenceSlotProps = { reference, onTrigger };

    // trigger by id

    let { id } = attrs;

    if (id && !slots.reference) {
      registerListener(id, referenceSlotProps);

      onBeforeUnmount(() => removeListener(id));
    }

    // context popover

    let contextData = ref(null);

    let showContextPopover = (ev, data) => {
      if (slots.reference) return;
      updateVirtualElement(ev);
      show();
      contextData.value = data;
    };

    provide("control-popover", {
      classes,
      title: toRef(props, "title"),
      hide,
    });

    expose({ showContextPopover });

    return {
      classes,
      popper,
      isPopperVisible,
      hide,
      onPopperTransitionLeave,
      referenceSlotProps,
      contextData,
      reference,
      onTrigger,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--popover-transition-duration) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
