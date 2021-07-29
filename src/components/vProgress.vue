<template>
  <div :class="classes.progress.value" class="relative">
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
      }"
      ref="progressBar"
    ></div>
  </div>
</template>

<script>
import { ref, computed, onMounted, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import { clamp, removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    value: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    label: { type: Boolean, default: true },
    precision: { type: Number, default: 2 },
    indeterminate: { type: Boolean, default: false },
    indeterminateWidth: { type: [String, Number], default: 75 },
    indeterminateSpeed: { type: String, default: "normal" },
    transition: { type: Boolean, default: true },
    name: { type: String, default: "progress" },
    theme: { type: String, default: "default" },
    styleProgress: { type: [String, Array], default: "default" },
    styleProgressBar: { type: [String, Array], default: "default" },
    styleLabel: { type: [String, Array], default: "default" },
  },
  setup(props) {
    let elements = ["progress", "progressBar", "label"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let fixedClasses = {
      progress: ["flex"],
      progressBar: ["flex", "justify-center", "items-center", "h-full"],
    };

    let classes = {
      progress: computed(() => {
        let c = [...fixedClasses.progress, ...styles.progress.value];
        return removeTailwindClasses(c);
      }),
      progressBar: computed(() => {
        let c = [
          ...fixedClasses.progressBar,
          ...styles.progressBar.value,
          props.indeterminate ? getIndeterminateSpeed() : "",
          props.transition && !props.indeterminate ? "transition-all" : "",
        ];
        return removeTailwindClasses(c);
      }),
      label: computed(() => {
        let c = [...styles.label.value];
        return removeTailwindClasses(c);
      }),
    };

    let progressBar = ref(null);
    let progressBarWidth = ref(0);

    onMounted(() => {
      if (props.indeterminate) {
        setProgressBarWidth();
        addEventListener("resize", setProgressBarWidth);
      }
    });

    let setProgressBarWidth = () => {
      progressBarWidth.value = progressBar.value.clientWidth;
    };

    let value = computed(() =>
      clamp((props.value / props.max) * 100, 0, props.max)
    );

    let precision = computed(() => clamp(props.precision, 0, 100));

    let label = computed(
      () => props.label && value.value.toFixed(precision.value) + " %"
    );

    let getIndeterminateSpeed = () => {
      return props.indeterminateSpeed == "normal"
        ? "indeterminate indeterminate-normal"
        : props.indeterminateSpeed == "fast"
        ? "indeterminate indeterminate-fast"
        : props.indeterminateSpeed == "slow"
        ? "indeterminate indeterminate-slow"
        : "indeterminate indeterminate-normal";
    };

    return {
      classes,
      value,
      label,
      getIndeterminateSpeed,
      progressBar,
      progressBarWidth,
    };
  },
};
</script>

<style scoped>
.indeterminate {
  position: absolute;
  transform-origin: left;
  animation-name: slide;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.indeterminate-normal {
  animation-duration: 2s;
}

.indeterminate-fast {
  animation-duration: 1.5s;
}

.indeterminate-slow {
  animation-duration: 2.5s;
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
