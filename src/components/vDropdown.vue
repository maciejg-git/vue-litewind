<template>
  <div
    ref="activator"
    @[trigger.on]="show"
    @[trigger.off]="hide"
    @[trigger.toggle]="togglePopper"
    class="inline-block"
    v-bind="$attrs"
  >
    <slot name="activator"></slot>
  </div>
  <teleport to="body">
    <transition :name="transition" :duration="300">
      <div
        v-if="isPopperOpen"
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
import { ref, reactive, watchEffect, provide, toRef, toRefs } from "vue";
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import useTrigger from "./composition/use-trigger"
import { correctPlacement } from "../const.js";

export default {
  inheritAttrs: true,
  props: {
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
  emits: ["state:opened", "state:closed"],
  setup(props, { emit }) {
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

    let dropdown = ref(null);
    let hideTimeout = null;

    let t = toRef(props, "trigger")
    let trigger = useTrigger(t)

    const { offsetX, offsetY, noFlip, placement } = toRefs(props);

    const {
      isPopperOpen,
      activator,
      popper,
      showPopper,
      hidePopper,
      togglePopper,
    } = usePopper({
      placement,
      offsetX,
      offsetY,
      noFlip,
      emit,
    });

    let { onClickOutside } = useClickOutside();
    onClickOutside([popper, activator], hidePopper);

    // prevent closing menu if using hover trigger
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

    // if using hover trigger delay hiding of menu to allow to move cursor to it
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

    return {
      placement,
      dropdown,
      activator,
      popper,
      showPopper,
      hidePopper,
      togglePopper,
      isPopperOpen,
      trigger,
      scheduleHide,
      show,
      hide,
      lock,
      unlock,
    };
  },
};
</script>

<style scoped lang="postcss">
.fixed-dropdown {
  @apply absolute z-50;
}
::v-deep .fixed-item {
  @apply block;
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
