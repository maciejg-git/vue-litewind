<template>
  <div ref="dropdown" class="inline-block">
    <div ref="activator" class="inline-block" @click="toggle">
      <slot name="activator" :toggle="toggle" :show="show" :hide="hide"></slot>
    </div>
    <transition :name="transition">
      <!-- v-bind="$attrs"  -->
      <div v-show="isOpen" ref="popper" class="absolute">
        <slot name="default" :hide="hide"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, provide, toRef, toRefs, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import usePopper from "./composition/usePopper.js";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  inheritAttrs: false,
  props: {
    placement: { type: String, default: "bottom-start" },
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 0 },
    noFlip: { type: Boolean, default: false },
    autoCloseMenu: { type: Boolean, default: false },
    transition: { type: String, default: "fade" },
    name: { type: String, default: "dropdown" },
    theme: { type: String, default: "default" },
    styleMenuItem: { type: String, default: "default" },
    styleMenuItemActive: { type: String, default: "default" },
    styleMenuItemDisabled: { type: String, default: "default" },
    styleMenuItemHeader: { type: String, default: "default" },
  },
  emits: ["state:opened", "state:closed"],
  setup(props, { emit }) {
    let elements = [
      "menuItem",
      "menuItemActive",
      "menuItemDisabled",
      "menuItemHeader",
    ];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let fixedClasses = {
      item: ["block", "px-4", "py-2"],
    };

    let classesItem = {
      item: computed(() => {
        let c = [...fixedClasses.item, ...styles.menuItem.value];
        return removeTailwindClasses(c);
      }),
      itemActive: computed(() => {
        let c = [...fixedClasses.item, ...styles.menuItemActive.value];
        return removeTailwindClasses(c);
      }),
      itemDisabled: computed(() => {
        let c = [...fixedClasses.item, ...styles.menuItemDisabled.value];
        return removeTailwindClasses(c);
      }),
      itemHeader: computed(() => {
        let c = [...fixedClasses.item, ...styles.menuItemHeader.value];
        return removeTailwindClasses(c);
      }),
    };

    let dropdown = ref(null);

    let clickOutside = function (ev) {
      if (
        !(dropdown.value === ev.target || dropdown.value.contains(ev.target))
      ) {
        hide();
      }
    };

    const { offsetX, offsetY, placement } = toRefs(props);

    const { isOpen, activator, popper, show, hide, toggle } = usePopper({
      placement,
      offsetX,
      offsetY,
      clickOutside,
    });

    provide("classes", classesItem);
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
