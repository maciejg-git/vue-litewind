<template>
  <div
    v-if="slots.reference"
    ref="reference"
    @[trigger.on]="showPopper"
    @[trigger.off]="hidePopper"
    @[trigger.toggle]="togglePopper"
    class="inline-block"
    v-bind="$attrs"
  >
    <slot name="reference"></slot>
  </div>
  <transition :name="transition">
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
</template>

<script>
import { toRef, toRefs, watch } from "vue";
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import useTrigger from "./composition/use-trigger";
import { sharedPopperProps, sharedStyleProps } from "../sharedProps"

export default {
  props: {
    ...sharedPopperProps,
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
  setup(props, { slots, emit }) {
    let { classes } = useStyles("popover", props, {
      popover: null,
      content: null,
    });

    // set triggering events: click, focus and hover
    let trigerRef = toRef(props, "trigger");
    let trigger = useTrigger(trigerRef);

    // popper
    const { offsetX, offsetY, noFlip, placement } = toRefs(props);
    const {
      isPopperVisible,
      reference,
      popper,
      showPopper,
      hidePopper,
      togglePopper,
    } = usePopper({ placement, offsetX, offsetY, noFlip, emit });

    // add click outside callback
    let { onClickOutside } = useClickOutside();
    let stopClickOutside = null;

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
      trigger,
      reference,
      popper,
      isPopperVisible,
      showPopper,
      hidePopper,
      togglePopper,
      slots,
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
