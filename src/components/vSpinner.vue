<template>
  <div class="spinner-container">
    <div v-if="icon">
      <v-icon :class="classes.spinner.value" :name="icon" />
    </div>
    <div v-else-if="type === 'svg'" class="bg-transparent">
      <svg
        viewBox="25 25 50 50"
        fill="none"
        :class="['spinner-svg', classes.spinner.value]"
      >
        <circle
          cx="50"
          cy="50"
          r="20"
          stroke-width="4"
          stroke-miterlimit="10"
        />
      </svg>
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
    type: { type: String, default: "border" },
    icon: { type: [String, Object], default: undefined },
    name: { type: String, default: "spinner" },
    styleSpinner: { type: String, default: "" },
    variant: { type: String, default: ""},
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
  border: 0.2em solid;
  border-right-color: transparent;
  border-radius: 50%;
}
.spinner-animation {
  animation: var(--spinner-border-speed) linear infinite spinner-border;
}
@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}

.spinner-svg {
  animation: loader-rotate var(--spinner-svg-speed) linear infinite;
  transform-origin: center center;
}

.spinner-svg circle {
  stroke: currentColor;
  stroke-dasharray: 89, 200;
  stroke-dashoffset: -35px;
  animation: loader-dash var(--spinner-svg-speed) ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes loader-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
