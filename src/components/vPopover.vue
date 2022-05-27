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
              @click="hidePopper"
            />
          </header>
          <div :class="classes.content.value">
            <slot name="default"></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
// vue
import { toRefs, watch } from "vue";
// composition
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import useTrigger from "./composition/use-trigger";
// props
import { sharedPopperProps, sharedStyleProps } from "../shared-props";
import "../styles/transitions.css"

export default {
  props: {
    ...sharedPopperProps(),
    trigger: { type: String, default: "click" },
    delay: { type: Number, default: 50 },
    noHeader: { type: Boolean, default: false },
    title: { type: String, default: undefined },
    transition: { type: String, default: "fade-m" },
    clickOutsideClose: { type: Boolean, default: false },
    stylePopover: { type: String, default: "" },
    styleContent: { type: String, default: "" },
    ...sharedStyleProps("popover"),
  },
  setup(props, { emit }) {
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
      togglePopper,
      onPopperTransitionLeave,
    } = usePopper({ placement, offsetX, offsetY, noFlip, emit });

    // click outside
    let { onClickOutside } = useClickOutside();
    let stopClickOutside = null;

    let onTrigger = useTrigger(trigger, showPopper, hidePopper, togglePopper);

    let referenceSlotProps = { reference, onTrigger }

    watch(
      () => props.clickOutsideClose,
      (clickOutsideClose) => {
        if (clickOutsideClose) {
          stopClickOutside = onClickOutside([popper, reference], hidePopper);
        } else {
          if (stopClickOutside) stopClickOutside();
        }
      },
      { immediate: true }
    );

    return {
      classes,
      popper,
      isPopperVisible,
      hidePopper,
      onPopperTransitionLeave,
      referenceSlotProps,
      reference,
      onTrigger,
    };
  },
};
</script>

<style scoped>
</style>
