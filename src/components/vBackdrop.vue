<template>
  <div
    v-if="isOpen"
    class="inset-0 overflow-y-auto"
    :class="classes.backdrop.value"
  >
    <!-- @slot default -->
    <slot name="default"></slot>
  </div>
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
    default: true,
  },
  fill: {
    type: String,
    default: "screen",
  },
});

let { backdrop } = inject("mods", {});

let elements = {
  backdrop: {
    computed: computed(() => {
      return props.fill === "element"
        ? "absolute"
        : props.fill === "screen"
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
