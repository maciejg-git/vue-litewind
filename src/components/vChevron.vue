<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="[classes.chevron.value, ['transform duration-150', getRotation()]]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path v-if="dir == 'd'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M19 9l-7 7-7-7"
    />
    <path v-else-if="dir == 'l'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M15 19l-7-7 7-7"
    />
    <path v-else-if="dir == 'r'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 5l7 7-7 7"
    />
    <path v-else-if="dir == 'u'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M5 15l7-7 7 7"
    />
  </svg>
</template>

<script>
import useStyles from "./composition/use-styles";

export default {
  props: {
    name: { type: String, default: "chevron" },
    styleChevron: { type: String, default: "" },
    dir: { type: String, default: "d" },
    counterClockwise: { type: Boolean, default: false },
    switch: { type: Boolean, default: false },
  },
  setup(props) {
    let { classes } = useStyles("chevron", props, {
      chevron: null,
    });

    let getRotation = () => {
      if (props.switch) {
        if (!props.counterClockwise) return "rotate-90"
        else if (props.counterClockwise) return "-rotate-90"
      }
    };

    return {
      classes,
      getRotation,
    };
  },
};
</script>

<style scoped></style>
