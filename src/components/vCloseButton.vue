<template>
  <button class="focus:outline-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="classes.closeButton.value"
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
import useStyles from "./composition/use-styles";

export default {
  props: {
    name: { type: String, default: "closeButton" },
    styleCloseButton: { type: String, default: "default" },
  },
  setup(props) {
    let { classes } = useStyles(props, {
      closeButton: null,
    })

    return {
      classes,
    };
  },
};
</script>

<style scoped></style>
