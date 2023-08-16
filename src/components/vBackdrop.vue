<template>
  <transition name="fade-backdrop">
    <div
      v-if="isOpen"
      class="inset-0 overflow-y-auto"
      :class="classes.backdrop.value"
    >
      <slot name="default"></slot>
    </div>
  </transition>
</template>

<script setup>
import { computed, inject } from "vue";
import { sharedProps, sharedModProps } from "../shared-props";
import useTailwindStyles from "./composition/use-tailwind-styles";

let props = defineProps({
  ...sharedProps(),
  ...sharedModProps("backdrop", ["Backdrop"]),
  isOpen: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: "fixed",
  },
});

let { backdrop } = inject("mods", {});

let elements = {
  backdrop: {
    computed: computed(() => {
      return props.position === "absolute"
        ? "absolute"
        : props.position === "fixed"
        ? "fixed z-30"
        : "fixed z-30";
    }),
  },
};

let { classes } = useTailwindStyles(props, backdrop, elements);
</script>

<style scoped>
.fade-backdrop-enter-active,
.fade-backdrop-leave-active {
  transition: opacity var(--backdrop-transition-duration) ease;
}
.fade-backdrop-enter-from,
.fade-backdrop-leave-to {
  opacity: 0;
}
</style>
