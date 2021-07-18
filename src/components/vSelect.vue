<template>
  <select
    v-bind="$attrs"
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    :class="classes.select.value"
  >
    <option v-for="o in options" :value="o.value">
      {{ o.label }}
    </option>
    <slot name="default"></slot>
  </select>
  <div :class="classes.textHelper.value">
    <slot name="helper"></slot>
  </div>
</template>

<script>
import { ref, computed, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    modelValue: { type: String, default: undefined },
    options: { type: Array, default: undefined },
    name: { type: String, default: "select" },
    theme: { type: String, default: "default" },
    styleSelect: { type: [String, Array], default: "default" },
    styleTextHelper: { type: [String, Array], default: "default" },
  },
  setup(props, { emit }) {
    let elements = ["select", "textHelper"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let classes = {
      select: computed(() => {
        let c = [...styles.select.value];
        return removeTailwindClasses(c);
      }),
      textHelper: computed(() => {
        let c = [...styles.textHelper.value];
        return removeTailwindClasses(c);
      }),
    };
    console.log(props.options)

    return {
      classes,
      emit,
    };
  },
};
</script>

<style scoped></style>
