<template>
  <button class="focus:outline-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="classes"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    color: { type: String, default: "text-gray-600" },
  },
  setup(props) {
    let classes = computed(() => {
      return ["w-6", "h-6", props.color];
    });

    return {
      classes,
    };
  },
};
</script>

<style scoped></style>
