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
      onPopperTransitionLeave,
    } = usePopper({ placement, offsetX, offsetY, noFlip, emit });

    // click outside
    let { onClickOutside } = useClickOutside();
    let stopClickOutside = null;

    let handleReferenceClick = (ev) => {
      if (!isPopperVisible.value) ev.stopPropagation()
      show()
    }

    let hide = () => {
      if (!isPopperVisible.value) return
      hidePopper()
      if (stopClickOutside) stopClickOutside = stopClickOutside()
    }

    let show = () => {
      if (isPopperVisible.value) return
      showPopper()
      if (props.trigger === "click") {
        stopClickOutside = onClickOutside(popper, hide)
      }
    }

    let onTrigger = useTrigger(trigger, handleReferenceClick, hide);

    let referenceSlotProps = { reference, onTrigger }

    return {
      classes,
      popper,
      isPopperVisible,
      hide,
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
