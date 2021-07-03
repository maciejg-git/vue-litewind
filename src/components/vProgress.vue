<template>
  <div :class="classes.progress.value">
    <div :class="classes.progressBar.value" :style="{ width: value + '%' }">
      <span v-if="label" :class="classes.label.value">
        <slot name="default" :value="value" :max="max">
          {{ label }}
        </slot>
      </span>
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import { clamp, removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    value: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    label: { type: Boolean, default: true },
    precision: { type: Number, default: 2 },
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
      progressBar: ["flex", "justify-center", "items-center"],
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
          props.transition ? "transition-all" : "",
        ];
        return removeTailwindClasses(c);
      }),
      label: computed(() => {
        let c = [...styles.label.value];
        return removeTailwindClasses(c);
      }),
    };

    let value = computed(() =>
      clamp((props.value / props.max) * 100, 0, props.max)
    );
    let label = computed(
      () => props.label && value.value.toFixed(props.precision) + " %"
    );

    return {
      classes,
      value,
      label,
    };
  },
};
</script>

<style scoped></style>
