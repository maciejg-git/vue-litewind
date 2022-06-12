<template>
  <slot name="reference" v-bind="referenceSlotProps"></slot>

  <teleport to="body">
    <transition :name="transition" @after-leave="onPopperTransitionLeave">
      <div
        v-if="isPopperVisible"
        ref="popper"
        role="listbox"
        tabindex="-1"
        @mouseenter="preventHiding"
        @mouseleave="allowHiding"
        class="fixed-dropdown"
      >
        <slot
          name="default"
          :hide="hidePopper"
          v-bind="contextData"
        ></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
// vue
import { ref, provide, toRef, toRefs, watch, nextTick } from "vue";
// composition
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import useTrigger from "./composition/use-trigger";
// props
import { sharedPopperProps, sharedStyleProps } from "../shared-props";
// style
import "../styles/transitions.css"

export default {
  inheritAttrs: true,
  props: {
    modelValue: { type: Boolean, default: false },
    ...sharedPopperProps(),
    autoCloseMenu: { type: Boolean, default: false },
    trigger: { type: String, default: "click" },
    transition: { type: String, default: "fade-m" },
    styleItem: { type: String, default: "" },
    styleHeader: { type: String, default: "" },
    ...sharedStyleProps("dropdown"),
  },
  emits: ["state:opened", "state:closed", "update:modelValue"],
  setup(props, { slots, emit, expose }) {
    let { classes, states } = useStyles("dropdown", props, {
      item: {
        fixed: "fixed-item",
        states: ["active", "disabled"],
      },
      header: {
        fixed: "fixed-item",
      },
    });

    // watch model changes
    watch(
      () => props.modelValue,
      (value) => (value ? show() : hide())
    );

    // set up popper
    const { offsetX, offsetY, noFlip, placement, modelValue } = toRefs(props);
    const {
      isPopperVisible,
      reference,
      popper,
      showPopper,
      hidePopper,
      onPopperTransitionLeave,
      updateVirtualElement,
    } = usePopper({ placement, offsetX, offsetY, noFlip, modelValue, emit });

    let { onClickOutside } = useClickOutside();

    // set up triggering events
    let trigger = toRef(props, "trigger");

    // delay closing menu if using hover trigger
    let hideTimeout = null;

    let preventHiding = () => {
      if (props.trigger === "hover") clearTimeout(hideTimeout);
    };

    let allowHiding = () => {
      if (props.trigger === "hover") hideTimeout = scheduleHide();
    };

    // show and hide functions, hover trigger which adds short delay before
    // close

    let stopClickOutside = null

    let show = () => {
      if (isPopperVisible.value) return
      if (props.trigger === "hover") clearTimeout(hideTimeout);
      showPopper();
      if (props.trigger === "click") {
        stopClickOutside = onClickOutside(popper, hide, reference);
      }
    }

    let hide = () => {
      if (!isPopperVisible.value) return
      if (props.trigger === "hover") {
        hideTimeout = scheduleHide();
        return;
      }
      hidePopper();
      if (stopClickOutside) stopClickOutside = stopClickOutside()
    }

    let onTrigger = useTrigger(trigger, show, hide);

    let scheduleHide = () => setTimeout(hidePopper, 100);

    // context dropdown

    let contextData = ref(null);

    let showContextDropdown = (ev, data) => {
      if (slots.reference) return;
      updateVirtualElement(ev)
      show()
      contextData.value = data;
    };

    let referenceSlotProps = { reference, onTrigger };

    provide("classes", classes);
    provide("states", states);
    provide("autoCloseMenu", toRef(props, "autoCloseMenu"));
    provide("hide", hide);
    provide("placement", toRef(props, "placement"));

    expose({ showContextDropdown })

    return {
      popper,
      hidePopper,
      isPopperVisible,
      onPopperTransitionLeave,
      preventHiding,
      allowHiding,
      referenceSlotProps,
      contextData,
    };
  },
};
</script>

<style scoped lang="postcss">
.fixed-dropdown {
  @apply absolute z-50;
}
</style>
