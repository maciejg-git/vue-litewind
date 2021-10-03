<template>
  <div
    class="inline-block"
    :style="{
      '--spinner-thickness': thickness + 'em',
      '--spinner-speed': speed + 's',
    }"
  >
    <div v-if="icon">
      <v-icon :class="classes.spinner.value" :name="icon" />
    </div>
    <div
      v-else
      class="spinner-border"
      :class="classes.spinner.value"
      role="status"
    ></div>
  </div>
</template>

<script>
import vIcon from "./vIcon.vue";
import useStyles from "./composition/use-styles";

export default {
  props: {
    thickness: { type: String, default: "0.15" },
    speed: { type: String, default: "0.75" },
    icon: { type: [String, Object], default: undefined },
    name: { type: String, default: "spinner" },
    styleSpinner: { type: String, default: "" },
  },
  components: {
    vIcon,
  },
  setup(props) {
    let { classes } = useStyles("spinner", props, {
      spinner: {
        fixed: "spinner-animation",
      },
    });

    return {
      classes,
    };
  },
};
</script>

<style scoped>
.spinner-border {
  border: var(--spinner-thickness) solid;
  border-right-color: transparent;
  border-radius: 50%;
}

.spinner-animation {
  animation: var(--spinner-speed) linear infinite spinner-border;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
</style>
