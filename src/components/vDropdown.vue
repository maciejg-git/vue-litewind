<template>
    <div
      ref="activator"
      @[trigger.on]="showMenu"
      @[trigger.off]="hideMenu"
      @[trigger.toggle]="toggle"
      class="inline-block"
      v-bind="$attrs"
    >
      <slot name="activator" :toggle="toggle" :show="show" :hide="hide"></slot>
    </div>
    <teleport to="body">
      <transition :name="transition" :duration="300">
        <div
          v-if="isOpen"
          ref="popper"
          @mouseenter="showMenu"
          @mouseleave="hideMenu"
          class="absolute z-50"
        >
          <slot name="default" :hide="hide"></slot>
        </div>
      </transition>
    </teleport>
</template>

<script>
import {
  ref,
  reactive,
  watchEffect,
  provide,
  toRef,
  toRefs,
  nextTick,
} from "vue";
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside"
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

    // TODO: recursive dropdown, overflow hidden, add ref to parent and teleport to it to prevent closing if clicking parent

    let hideTimeout = null;

    let trigger = reactive({
      on: null,
      off: null,
      toggle: null,
    });

    // watch trigger props and update events
    watchEffect(() => {
      if (props.trigger == "click") {
        trigger.on = null;
        trigger.off = null;
        trigger.toggle = "click";
      } else if (props.trigger == "hover") {
        trigger.on = "mouseenter";
        trigger.off = "mouseleave";
        trigger.toggle = null;
      } else if (props.trigger == "focus") {
        trigger.on = "focusin";
        trigger.off = "focusout";
        trigger.toggle = null;
      }
    });

    // options for popper.js
    const { offsetX, offsetY, noFlip, placement } = toRefs(props);

    const { isOpen, activator, popper, show, hide, toggle } = usePopper({
      placement,
      offsetX,
      offsetY,
      noFlip,
      emit,
    });

    let { onClickOutside } = useClickOutside()

    onClickOutside([popper, activator], hide)

    let showMenu = () => {
      if (props.trigger != "hover") return
      clearTimeout(hideTimeout);
      show();
    };

    let hideMenu = () => {
      if (props.trigger != "hover") return
      scheduleHide();
    };

    let scheduleHide = () => {
      hideTimeout = setTimeout(() => {
        hide();
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
      show,
      hide,
      toggle,
      isOpen,
      trigger,
      scheduleHide,
      showMenu,
      hideMenu,
    };
  },
};
</script>

<style scoped lang="postcss">
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
