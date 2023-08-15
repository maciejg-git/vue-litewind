<template>
  <div
    :class="classes.container.value"
    data-testid="spinner"
  >
    <div v-if="icon">
      <v-icon
        :class="classes.spinner.value"
        :name="icon"
      />
    </div>
    <div
      v-else-if="type === 'svg'"
      class="bg-transparent"
    >
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

<script setup>
import { inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import vIcon from "./vIcon.vue";
import { sharedProps, sharedModProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("spinner", ["Spinner", "Container"]),
  type: {
    type: String,
    default: "border",
  },
  icon: {
    type: [String, Object],
    default: undefined,
  },
});

let { spinner } = inject("mods", {})

let elements = {
  spinner: {
    fixed: "spinner-animation",
  },
  container: null
}

let { classes } = useTailwindStyles(props, spinner, elements)
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
