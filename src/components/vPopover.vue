<template>
  <slot name="reference" v-bind="referenceSlotProps"></slot>

  <teleport to="body">
    <transition :name="transition" @after-leave="onPopperTransitionLeave">
      <div v-if="isPopperVisible" ref="popper">
        <div :class="classes.popover.value">
          <header v-if="!noHeader" class="flex font-semibold px-3 py-2">
            {{ title }}
            <v-close-button
              style-close-button="small"
              class="ml-auto"
              @click="hide"
            />
          </header>
          <div :class="classes.content.value">
            <slot name="default" :hide="hide" v-bind="contextData"></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
// vue
import { ref, toRefs } from "vue";
// components
import vCloseButton from "./vCloseButton.vue"
// composition
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import useTrigger from "./composition/use-trigger";
// props
import { sharedPopperProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";
import "../styles/transitions.css";

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
    stylePopover: {
      type: String,
      default: defaultProps("popover", "stylePopover", ""),
    },
    styleContent: {
      type: String,
      default: defaultProps("popover", "styleContent", ""),
    },
    ...sharedStyleProps("popover"),
  },
  components: {
    vCloseButton,
  },
  setup(props, { slots, emit, expose }) {
    let { classes } = useStyles("popover", props, {
      popover: null,
      content: null,
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

    let onTrigger = useTrigger(trigger, show, hide);

    let referenceSlotProps = { reference, onTrigger };

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

<style scoped></style>
