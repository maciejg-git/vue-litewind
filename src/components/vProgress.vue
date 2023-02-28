<template>
  <div>
    <div
      :class="classes.progress.value"
      class="relative"
    >
      <div
        v-if="!indeterminate"
        :class="classes.progressBar.value"
        :style="{ width: value + '%' }"
      >
        <span
          v-if="label"
          :class="classes.label.value"
        >
        <!-- @slot default -->
          <slot
            name="default"
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
import { computed } from "vue";
import useStyles from "./composition/use-styles";
import { clamp, isNumber } from "../tools";
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("progress"),
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
    default: true,
  },
  precision: {
    type: Number,
    default: 2,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  transition: {
    type: Boolean,
    default: true,
  },
  styleProgress: {
    type: [String, Array],
    default: defaultProps("progress", "styleProgress", ""),
  },
  styleProgressBar: {
    type: [String, Array],
    default: defaultProps("progress", "styleProgressBar", ""),
  },
  styleLabel: {
    type: [String, Array],
    default: defaultProps("progress", "styleLabel", ""),
  },
});

let { classes } = useStyles("progress", props, {
  progress: {
    fixed: "flex",
  },
  progressBar: {
    name: "progress-bar",
    fixed: "flex justify-center items-center h-full",
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
</script>

<style scoped lang="postcss">
.indeterminate {
  position: absolute;
  width: var(--progress-bar-width);
  transform-origin: left;
  animation-name: slide;
  animation-iteration-count: infinite;
  animation-timing-function: var(--progress-bar-timing);
  animation-duration: var(--progress-bar-speed);
  animation-direction: var(--progress-bar-direction);
}

@keyframes slide {
  from {
    left: calc(var(--progress-bar-width) * -1.1);
  }

  to {
    left: 110%;
  }
}
</style>
