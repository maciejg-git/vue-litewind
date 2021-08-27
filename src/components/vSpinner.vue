<template>
  <div
    :class="classes.spinner.value"
    role="status"
    :style="{
      '--spinner-thickness': thickness + 'em',
      '--spinner-speed': speed + 's',
    }"
  ></div>
</template>

<script>
import useStyles from "./composition/use-styles 2";

export default {
  props: {
    thickness: { type: String, default: "0.15" },
    speed: { type: String, default: "0.75" },
    name: { type: String, default: "spinner" },
    theme: { type: String, default: "default" },
    styleSpinner: { type: String, default: "default" },
  },
  setup(props) {
    let { classes } = useStyles(props, {
      spinner: {
        fixed: "spinner-border"
      }
    })

    return {
      classes,
    };
  },
};
</script>

<style scoped>
.spinner-border {
  display: inline-block;
  border: var(--spinner-thickness) solid;
  border-right-color: transparent;
  border-radius: 50%;
  animation: var(--spinner-speed) linear infinite spinner-border;
}
@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
</style>
