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
import { toRef, toRefs, watch } from "vue";
// composition
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import useTrigger from "./composition/use-trigger";
// props
import { sharedPopperProps, sharedStyleProps } from "../sharedProps";

export default {
  props: {
    ...sharedPopperProps(),
    trigger: { type: String, default: "click" },
    delay: { type: Number, default: 50 },
    noHeader: { type: Boolean, default: false },
    title: { type: String, default: undefined },
    transition: { type: String, default: "fade" },
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

    // popper
    const { offsetX, offsetY, noFlip, placement } = toRefs(props);
    const {
      isPopperVisible,
      reference,
      referenceEl,
      popper,
      showPopper,
      hidePopper,
      togglePopper,
      onPopperTransitionLeave,
    } = usePopper({ placement, offsetX, offsetY, noFlip, emit });

    // add click outside callback
    let { onClickOutside } = useClickOutside();
    let stopClickOutside = null;

    let trigerRef = toRef(props, "trigger");
    let onTrigger = useTrigger(trigerRef, showPopper, hidePopper, togglePopper);

    let referenceSlotProps = { reference, onTrigger }

    watch(
      () => props.clickOutsideClose,
      (clickOutsideClose) => {
        if (clickOutsideClose) {
          stopClickOutside = onClickOutside([popper, referenceEl], hidePopper);
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
      showPopper,
      hidePopper,
      togglePopper,
      onPopperTransitionLeave,
      referenceSlotProps,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
