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
import useStyles from "./composition/use-styles";
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  styleWrapper: {
    type: String,
    default: defaultProps("closeButton", "styleWrapper", ""),
  },
  styleCloseButton: {
    type: String,
    default: defaultProps("closeButton", "styleCloseButton", ""),
  },
  ...sharedStyleProps("closeButton"),
});

let { classes } = useStyles("close-button", props, {
  closeButton: {
    name: "close-button",
  },
  wrapper: null,
});
</script>

<style scoped></style>
