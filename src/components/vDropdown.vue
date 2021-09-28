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
import { ref, computed, provide, toRef, toRefs } from "vue";
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

    let trigerRef = toRef(props, "trigger");
    let trigger = useTrigger(trigerRef);

    const { offsetX, offsetY, noFlip, placement } = toRefs(props);
    const {
      isPopperVisible,
      activator,
      popper,
      showPopper,
      hidePopper,
      togglePopper,
    } = usePopper({ placement, offsetX, offsetY, noFlip, emit });

    let { onClickOutside } = useClickOutside();
    onClickOutside([popper, activator], hidePopper);

    let isDropdownVisible = computed(() => {
      return isPopperVisible.value || props.modelValue
    })

    // prevent closing menu if pointer is over menu and using hover trigger
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
    provide("placement", toRef(props, "placement"))

    return {
      placement,
      dropdown,
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
      isDropdownVisible,
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
