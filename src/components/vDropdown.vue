<template>
  <div
    v-if="slots.activator"
    ref="activator"
    @[trigger.on].stop="show"
    @[trigger.off].stop="hide"
    @[trigger.toggle].stop="togglePopper"
    class="inline-block"
    v-bind="$attrs"
  >
    <slot name="activator"></slot>
  </div>
  <teleport to="body">
    <transition :name="transition">
      <div
        v-if="isPopperVisible"
        ref="popper"
        @mouseenter="lock"
        @mouseleave="unlock"
        class="fixed-dropdown"
      >
        <slot name="default" :hide="hidePopper"></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { ref, computed, provide, toRef, toRefs, watch } from "vue";
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import useTrigger from "./composition/use-trigger";
import { correctPlacement } from "../const.js";

export default {
  inheritAttrs: true,
  props: {
    modelValue: { type: Boolean, default: false },
    reference: { type: Object, default: undefined },
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
    styleIcon: { type: String, default: "" },
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
      icon: null,
    });

    // trigger: click, focus, hover

    let triggerMethod = toRef(props, "trigger");
    let trigger = useTrigger(triggerMethod);

    // popper

    const { offsetX, offsetY, noFlip, placement, modelValue } = toRefs(props);
    const {
      isPopperVisible,
      activator,
      popper,
      showPopper,
      hidePopper,
      togglePopper,
      virtualElement,
      updateVirtualElement,
    } = usePopper({ placement, offsetX, offsetY, noFlip, modelValue, emit });

    if (!slots.activator) {
      watch(
        () => props.reference,
        (value) => {
          if (!value) return;
          updateVirtualElement(value);
          activator.value = virtualElement;
        },
        { immediate: true }
      );
    }

    // model show/hide

    watch(
      () => props.modelValue,
      (value) => {
        if (value) show();
        else hide();
      }
    );

    // click outside

    let { onClickOutside } = useClickOutside();
    onClickOutside([popper, activator], hidePopper);

    // show/hide dropdown

    let hideTimeout = null;

    // temporary prevent closing menu if pointer is over menu 
    // and using hover trigger
    let lock = () => {
      if (props.trigger == "hover") clearTimeout(hideTimeout);
    };

    let unlock = () => {
      if (props.trigger == "hover") scheduleHide();
    };

    let show = () => {
      if (props.trigger == "hover") {
        clearTimeout(hideTimeout);
        showPopper();
        return;
      }
      showPopper();
    };

    let hide = () => {
      if (props.trigger == "hover") scheduleHide();
      else hidePopper();
    };

    // if using hover trigger delay hiding of menu
    let scheduleHide = () => {
      hideTimeout = setTimeout(() => {
        hidePopper();
      }, 100);
    };

    provide("classes", classes);
    provide("states", states);
    // provide hide function to menuitem to allow closing after click
    provide("autoCloseMenu", toRef(props, "autoCloseMenu"));
    provide("hide", hide);
    provide("placement", toRef(props, "placement"));

    return {
      placement,
      activator,
      popper,
      showPopper,
      hidePopper,
      togglePopper,
      isPopperVisible,
      trigger,
      scheduleHide,
      show,
      hide,
      lock,
      unlock,
      slots,
    };
  },
};
</script>

<style scoped lang="postcss">
.fixed-dropdown {
  @apply absolute z-50;
}
::v-deep .fixed-item {
  @apply flex;
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
