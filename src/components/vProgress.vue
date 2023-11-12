<template>
  <div>
    <div
      :class="classes.progress.value"
      class="relative"
      role="progressbar"
      :aria-valuemax="max"
      :aria-valuenow="timer ? timerValue : getValue()"
    >
      <div
        v-if="!indeterminate"
        :class="classes.progressBar.value"
        :style="{ width: (timer ? timerValue : getValue()) + '%' }"
      ></div>
      <div
        v-else
        :class="classes.progressBar.value"
      ></div>
      <!-- @slot label -->
      <slot
        v-if="label"
        name="label"
        :value="value"
        :max="max"
      >
        <span :class="classes.label.value">
          {{ label }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles";
import useAnimate from "./composition/use-animate";
import { clamp, isNumber } from "../tools";
import { sharedProps, sharedModProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("progress", ["Progress", "ProgressBar", "Label"]),
  value: {
    type: [Number, String],
    default: 0,
    validator(v) {
      return isNumber(+v);
    },
  },
  max: {
    type: [Number, String],
    default: 100,
    validator(v) {
      return isNumber(+v);
    },
  },
  label: {
    type: Boolean,
    default: false,
  },
  precision: {
    type: Number,
    default: 2,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  timer: {
    type: Number,
    default: 0,
  },
  autostartTimer: {
    type: Boolean,
    default: false,
  },
  transition: {
    type: Boolean,
    default: false,
  },
});

let { progress } = inject("mods", {});

let elements = {
  progress: {
    fixed: "flex",
  },
  progressBar: {
    fixed: "flex justify-center items-center h-full",
    computed: computed(() => {
      return props.indeterminate
        ? "indeterminate"
        : props.transition && !props.timer
        ? "transition-all duration-[--progress-bar-duration]"
        : "";
    }),
  },
  label: {
    fixed: "absolute left-1/2 -translate-x-1/2"
  },
};

let { classes } = useTailwindStyles(props, progress, elements);

let getValue = () => {
  return clamp((props.value / props.max) * 100, 0, props.max);
};

let label = computed(
  () => props.label && getValue().toFixed(props.precision) + " %"
);

// timer progress

let timerValue = ref(0);
let animate = useAnimate();

let startTimer = () => {
  animate.set({
    duration: props.timer,
    timing: (timeFraction) => timeFraction * 100,
    draw: (progress) => (timerValue.value = progress),
  });
  animate.play();
};

onMounted(() => {
  if (props.timer && props.autostartTimer) {
    startTimer();
  }
});

onBeforeUnmount(() => {
  if (props.timer) {
    animate.destroy();
  }
});

defineExpose({ animate });
</script>

<style>
.indeterminate {
  position: absolute;
  width: var(--progress-bar-indeterminate-width);
  transform-origin: left;
  animation-name: slide;
  animation-iteration-count: infinite;
  animation-timing-function: var(--progress-bar-indeterminate-timing);
  animation-duration: var(--progress-bar-indeterminate-duration);
  animation-direction: var(--progress-bar-indeterminate-direction);
}

@keyframes slide {
  from, 15% {
    left: 0%;
    transform: translateX(-100%);
  }

  to {
    left: 100%;
    transform: scaleX(var(--progress-bar-indeterminate-scale))
  }
}
</style>
