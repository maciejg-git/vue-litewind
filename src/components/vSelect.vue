<template>
  <select v-bind="$attrs" v-model="localModel" :class="classes.select.value">
    <option
      v-for="(o, i) in options"
      :key="i"
      :value="o.value"
      :disabled="isOptionDisabled(o)"
    >
      {{ o.label }}
    </option>
    <slot name="default"></slot>
  </select>
  <div :class="classes.textHelper.value">
    <slot name="helper"></slot>
  </div>
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    modelValue: { type: [String, Array], default: undefined },
    options: { type: Array, default: undefined },
    name: { type: String, default: "select" },
    theme: { type: String, default: "default" },
    styleSelect: { type: [String, Array], default: "default" },
    styleTextHelper: { type: [String, Array], default: "default" },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    let elements = ["select", "textHelper"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let classes = {
      select: computed(() => {
        let c = ["appearance-none", "select-tailwind", ...styles.select.value];
        return removeTailwindClasses(c);
      }),
      textHelper: computed(() => {
        let c = [...styles.textHelper.value];
        return removeTailwindClasses(c);
      }),
    };

    let isOptionDisabled = (o) => {
      return o.disabled == undefined || o.disabled == null ? false : o.disabled;
    };

    let localModel = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      },
    });

    return {
      classes,
      isOptionDisabled,
      localModel,
    };
  },
};
</script>

<style scoped>
.select-tailwind:not([multiple]) {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
}
</style>
