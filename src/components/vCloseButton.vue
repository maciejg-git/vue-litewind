<template>
  <button
    class="flex items-center focus:outline-none"
    :class="classes.wrapper.value"
    aria-label="Close"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="classes.closeButton.value"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
      />
    </svg>
  </button>
</template>

<script setup>
import { inject } from "vue"
import useTailwindStyles from "./composition/use-tailwind-styles"
import { sharedProps, sharedModProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("closeButton", ["CloseButton", "Wrapper"]),
});

let { closeButton } = inject("mods", {})

let elements = {
  closeButton: null,
  wrapper: null,
}

let { classes } = useTailwindStyles(props, closeButton, elements)
</script>

<style scoped></style>
