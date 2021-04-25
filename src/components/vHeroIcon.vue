<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="classes"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <slot name="default"></slot>
  </svg>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    color: { type: String, default: "text-gray-600" },
  },
  setup(props) {
    let classes = computed(() => {
      return ["w-6", "h-6", "focus:outline-none", props.color];
    });

    return {
      classes,
    };
  },
};
</script>
