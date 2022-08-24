<template>
  <slot name="reference" v-bind="referenceSlotProps" :is-open="isPopperVisible"></slot>

  <teleport to="body">
    <transition :name="transition" @after-leave="onPopperTransitionLeave">
      <div v-if="isPopperVisible" ref="popper">
        <slot name="default" :hide="hide" v-bind="contextData"></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
// vue
import { ref, toRefs, onBeforeUnmount } from "vue";
// composition
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import useTrigger from "./composition/use-trigger";
// props
import { sharedPopperProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";
// trigger
import { addListener, removeListener } from "../identifiers";

export default {
  props: {
    ...sharedPopperProps(),
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
      default: defaultProps("popover", "transition", "fade-m"),
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

    let { id } = attrs

    if (id && !slots.reference) {
      addListener(id, referenceSlotProps)

      onBeforeUnmount(() => removeListener(id))
    }

    // context popover

    let contextData = ref(null);

    let showContextPopover = (ev, data) => {
      if (slots.reference) return;
      updateVirtualElement(ev);
      show();
      contextData.value = data;
    };

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

<style>
@import "../styles/transitions.css";
</style>
