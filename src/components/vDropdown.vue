<template>
  <div ref="dropdown" class="inline-block">
    <div ref="activator" class="inline-block" @click="toggle">
      <slot name="activator" :toggle="toggle" :show="show" :hide="hide"></slot>
    </div>
    <transition :name="transition">
      <div v-show="isOpen" ref="popper" class="absolute">
        <slot name="default" :hide="hide"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, provide, toRef, toRefs } from "vue";
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
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
    transition: { type: String, default: "fade" },
    name: { type: String, default: "dropdown" },
    styleItem: { type: String, default: "default" },
    styleItemActive: { type: String, default: "default" },
    styleItemDisabled: { type: String, default: "default" },
    styleHeader: { type: String, default: "default" },
  },
  emits: ["state:opened", "state:closed"],
  setup(props, { emit }) {
    let { classes, states } = useStyles(props, {
      item: {
        fixed: "fixed-item",
        states: ["active", "disabled"],
      },
      header: {
        fixed: "fixed-item"
      },
    })

    let dropdown = ref(null);

    let clickOutside = function (ev) {
      if (
        !(dropdown.value === ev.target || dropdown.value.contains(ev.target))
      ) {
        hide();
      }
    };

    const { offsetX, offsetY, noFlip, placement } = toRefs(props);

    const { isOpen, activator, popper, show, hide, toggle } = usePopper({
      placement,
      offsetX,
      offsetY,
      noFlip,
      clickOutside,
      emit,
    });

    provide("classes", classes);
    provide("states", states);
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
    };
  },
};
</script>

<style scoped lang="postcss">
::v-deep .fixed-item {
  @apply block px-4 py-2
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
