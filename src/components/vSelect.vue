<template>
  <select v-bind="$attrs" v-model="localModel" :class="classes.select.value">
    <slot name="option-prepend"></slot>
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
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    modelValue: { type: [String, Array, Boolean], default: undefined },
    options: { type: Array, default: undefined },
    state: { type: String, default: "" },
    name: { type: String, default: "select" },
    theme: { type: String, default: "default" },
    styleSelect: { type: [String, Array], default: "default" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    let elements = ["select"];

    let s = ["valid", "invalid", "disabled"];

    let { styles, states } = useStyles(getCurrentInstance(), props, elements, s);

    let classes = {
      select: computed(() => {
        let c = [
          ...styles.select.value,
          ...(props.state == "valid"
            ? states.select.valid
            : props.state == "invalid"
            ? states.select.invalid
            : ""),
          ...(attrs.disabled === "" || attrs.disabled === true
            ? states.select.disabled
            : ""),
        ];
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

<style scoped></style>
