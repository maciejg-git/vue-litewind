<template>
  <transition
    :name="updateAnimation"
    mode="out-in"
  >
    <span
      :class="classes.badge.value"
      :key="updateKey + ''"
    >
      <!-- @slot default -->
      <slot name="default"></slot>
    </span>
  </transition>
</template>

<script setup>
import { computed } from "vue";
import useStyles from "./composition/use-styles";
import { sharedProps, sharedStyleProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("badge", ["Badge"]),
  position: {
    type: String,
    default: "",
  },
  updateKey: {
    type: [String, Number],
    default: undefined,
  },
  updateAnimation: {
    type: String,
    default: "",
  },
});

let { classes } = useStyles("badge", props, {
  badge: {
    fixed: "inline-flex items-center align-top",
    prop: computed(() => {
      return props.position == "top-right"
        ? "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2"
        : props.position == "top-left"
        ? "absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2"
        : props.position == "bottom-right"
        ? "absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2"
        : props.position == "bottom-left"
        ? "absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2"
        : "";
    }),
  },
});
</script>

<style scoped lang="postcss">
.scale-up-enter-active,
.scale-up-leave-active {
  transition: transform 0.2s ease;
}
.scale-up-enter-from,
.scale-up-leave-to {
  transform: scale(1.4);
}

.to-danger-enter-active,
.to-danger-leave-active {
  transition: background-color 0.4s ease;
}
.to-danger-enter-from,
.to-danger-leave-to {
  @apply bg-danger-500 dark:bg-danger-500;
}

.to-success-enter-active,
.to-success-leave-active {
  transition: background-color 0.4s ease;
}
.to-success-enter-from,
.to-success-leave-to {
  @apply bg-success-500 dark:bg-success-500;
}

.bounce-enter-active,
.bounce-leave-active {
  transition: transform 0.2s ease;
}
.bounce-enter-from,
.bounce-leave-to {
  transform: translateY(-35%);
}
</style>
