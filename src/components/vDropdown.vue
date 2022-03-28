<template>
  <div
    v-if="slots.reference"
    ref="reference"
    @[triggerEvents.on]="show"
    @[triggerEvents.off]="hide"
    @[triggerEvents.toggle]="togglePopper"
    class="inline-block"
    v-bind="$attrs"
  >
    <slot name="reference"></slot>
  </div>
  <teleport to="body">
    <transition :name="transition">
      <div
        v-if="isPopperVisible"
        ref="popper"
        @mouseenter="preventHiding"
        @mouseleave="allowHiding"
        class="fixed-dropdown"
      >
        <slot name="default" :hide="hidePopper" :context-data="contextData"></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { ref, provide, toRef, toRefs, watch } from "vue";
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import useTrigger from "./composition/use-trigger";
import { correctPlacement } from "../const.js";

export default {
  inheritAttrs: true,
  props: {
    modelValue: { type: Boolean, default: false },
    placement: {
      type: String,
      default: "bottom-start",
      validator: function (v) {
        return correctPlacement.includes(v);
      },
    },
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 0 },
    noFlip: { type: Boolean, default: false },
    autoCloseMenu: { type: Boolean, default: false },
    trigger: { type: String, default: "click" },
    transition: { type: String, default: "fade" },
    name: { type: String, default: "dropdown" },
    styleItem: { type: String, default: "" },
    styleHeader: { type: String, default: "" },
    variant: { type: String, default: ""},
  },
  emits: ["state:opened", "state:closed", "update:modelValue"],
  setup(props, { slots, emit }) {
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

    // set up triggering events
    let trigger = toRef(props, "trigger");
    let triggerEvents = useTrigger(trigger);

    // set up popper
    const { offsetX, offsetY, noFlip, placement, modelValue } = toRefs(props);
    const {
      isPopperVisible,
      reference,
      popper,
      showPopper,
      hidePopper,
      togglePopper,
      showVirtualPopper,
    } = usePopper({ placement, offsetX, offsetY, noFlip, modelValue, emit });

    // add click outside callback
    let { onClickOutside } = useClickOutside();
    let clickOutsideElements = [popper];
    if (slots.reference) clickOutsideElements.push(reference)
    onClickOutside(clickOutsideElements, hidePopper);

    // delay closing menu if using hover trigger
    let hideTimeout = null;

    let preventHiding = () => {
      if (props.trigger === "hover") clearTimeout(hideTimeout);
    }

    let allowHiding = () => {
      if (props.trigger === "hover") hideTimeout = scheduleHide();
    }

    // show and hide functions, the only special case is hover trigger which
    // adds short delay before close
    let show = () => {
      if (props.trigger === "hover") clearTimeout(hideTimeout);
      showPopper();
    };

    let hide = () => {
      if (props.trigger === "hover") {
        hideTimeout = scheduleHide();
        return;
      }
      hidePopper();
    };

    let scheduleHide = () => setTimeout(hidePopper, 100);

    // context dropdown

    let contextData = ref(null);

    let showContextDropdown = (e, data) => {
      if (slots.reference) return;
      showVirtualPopper(e)
      contextData.value = data
    }

    provide("classes", classes);
    provide("states", states);
    // provide hide function to menuitem to allow closing after click
    provide("autoCloseMenu", toRef(props, "autoCloseMenu"));
    provide("hide", hide);
    provide("placement", toRef(props, "placement"));

    return {
      placement,
      reference,
      popper,
      showPopper,
      hidePopper,
      togglePopper,
      isPopperVisible,
      triggerEvents,
      scheduleHide,
      show,
      hide,
      preventHiding,
      allowHiding,
      slots,
      showContextDropdown,
      contextData,
    };
  },
};
</script>

<style scoped lang="postcss">
.fixed-dropdown {
  @apply absolute z-50;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
