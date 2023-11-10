<template>
  <div>
    <div
      :class="classes.progress.value"
      class="relative"
    >
      <div
        v-if="!indeterminate"
        :class="classes.progressBar.value"
        :style="{ width: (timer ? timerValue : getValue()) + '%' }"
      >
        <span
          v-if="label"
          :class="classes.label.value"
        >
          <!-- @slot label -->
          <slot
            name="label"
            :value="value"
            :max="max"
          >
            {{ label }}
          </slot>
        </span>
      </div>
      <div
        v-else
        :class="classes.progressBar.value"
      ></div>
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
        ? "transition-all duration-[--progress-bar-speed]"
        : "";
    }),
  },
  label: null,
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
    timing: (time) => time * 100,
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

<style scoped>
.indeterminate {
  position: absolute;
  width: var(--progress-bar-indeterminate-width);
  transform-origin: left;
  animation-name: slide;
  animation-iteration-count: infinite;
  animation-timing-function: var(--progress-bar-indeterminate-timing);
  animation-duration: var(--progress-bar-indeterminate-speed);
  animation-direction: var(--progress-bar-indeterminate-direction);
}

@keyframes slide {
  from {
    left: calc(var(--progress-bar-indeterminate-width) * var(--progress-bar-indeterminate-offset) * -1);
  }

  to {
    left: calc(100% * var(--progress-bar-indeterminate-offset));
  }
}
</style>
