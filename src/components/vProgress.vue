<template>
  <div>
    <div ref="progress" :class="classes.progress.value" class="relative">
      <div
        v-if="!indeterminate"
        :class="classes.progressBar.value"
        :style="{ width: value + '%' }"
      >
        <span v-if="label" :class="classes.label.value">
          <slot name="default" :value="value" :max="max">
            {{ label }}
          </slot>
        </span>
      </div>
      <div
        v-else
        :class="classes.progressBar.value"
        :style="{
          width: indeterminateWidth + '%',
          '--progress-bar-width': -progressBarWidth + 'px',
          '--progress-bar-timer': getProgressTimer(),
          '--progress-bar-timing': indeterminateTiming,
        }"
        ref="progressBar"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import useStyles from "./composition/use-styles";
import { clamp, isNumber } from "../tools/tools";

export default {
  props: {
    value: { 
      type: [Number, String], 
      default: 0,
      validator(v) { return isNumber(+v) },
    },
    max: { 
      type: [Number, String], 
      default: 100,
      validator(v) { return isNumber(+v) },
    },
    label: { type: Boolean, default: true },
    precision: { type: Number, default: 2 },
    indeterminate: { type: Boolean, default: false },
    indeterminateWidth: { type: [String, Number], default: 50 },
    indeterminateTiming: { type: String, default: "linear" },
    indeterminateSpeed: { type: Number, default: 7 },
    transition: { type: Boolean, default: true },
    name: { type: String, default: "progress" },
    styleProgress: { type: [String, Array], default: "" },
    styleProgressBar: { type: [String, Array], default: "" },
    styleLabel: { type: [String, Array], default: "" },
  },
  setup(props) {
    let { classes } = useStyles("progress", props, {
      progress: {
        fixed: "fixed-button",
      },
      progressBar: {
        name: "progress-bar",
        fixed: "fixed-progress-bar",
        prop: computed(() => {
          return props.indeterminate
            ? "indeterminate"
            : props.transition
            ? "transition-all duration-100"
            : "";
        }),
      },
      label: null,
    });

    let value = computed(() => {
      return clamp((props.value / props.max) * 100, 0, props.max);
    });

    let precision = computed(() => clamp(props.precision, 0, 100));

    let label = computed(
      () => props.label && value.value.toFixed(precision.value) + " %"
    );

    // indeterminate

    let progress = ref(null);
    let progressBar = ref(null);
    let progressWidth = ref(0);
    let progressBarWidth = ref(0);

    // handle resize window event to update width of progress bar
    onMounted(() => {
      if (props.indeterminate) {
        getProgressWidth();
        addEventListener("resize", getProgressWidth);
      }
    });

    onUnmounted(() => {
      if (props.indeterminate) {
        removeEventListener("resize", getProgressWidth);
      }
    });

    // speed should be similar for wide and narrow progress bars
    let getProgressTimer = () => {
      let speed = clamp(props.indeterminateSpeed, 1, 20) + 10;
      return Math.sqrt(progressWidth.value + 300) / speed + "s";
    };

    let getProgressWidth = () => {
      progressBarWidth.value = progressBar.value.clientWidth;
      progressWidth.value = progress.value.clientWidth;
    };

    return {
      classes,
      value,
      label,
      progress,
      progressBar,
      progressBarWidth,
      getProgressTimer,
    };
  },
};
</script>

<style scoped lang="postcss">
.fixed-progress {
  @apply flex;
}
.fixed-progress-bar {
  @apply flex justify-center items-center h-full;
}
.indeterminate {
  position: absolute;
  transform-origin: left;
  animation-name: slide;
  animation-iteration-count: infinite;
  animation-timing-function: var(--progress-bar-timing);
  animation-duration: var(--progress-bar-timer);
}

@keyframes slide {
  from {
    left: var(--progress-bar-width);
  }

  to {
    left: 100%;
  }
}
</style>
