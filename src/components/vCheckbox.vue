<template>
  <input
    v-bind="$attrs"
    v-model="localModel"
    type="checkbox"
    :class="classes.checkbox.value"
  />
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    modelValue: { type: [Array, Boolean], default: undefined },
    state: { type: String, default: "" },
    name: { type: String, default: "checkbox" },
    theme: { type: String, default: "default" },
    styleCheckbox: { type: [String, Array], default: "default" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    let elements = ["checkbox"];

    let s = ["valid", "invalid", "disabled"];

    let { styles, states } = useStyles(
      getCurrentInstance(),
      props,
      elements,
      s
    );

    let classes = {
      checkbox: computed(() => {
        let c = [
          ...styles.checkbox.value,
          ...(props.state == "valid" || props.state === true
            ? states.checkbox.valid
            : props.state == "invalid" || props.state === false
            ? states.checkbox.invalid
            : props.state == "normal" ||
              props.state === null ||
              props.state === undefined
            ? ""
            : ""),
          ...(attrs.disabled === "" || attrs.disabled === true
            ? states.checkbox.disabled
            : ""),
        ];
        return removeTailwindClasses(c);
      }),
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
      localModel,
    };
  },
};
</script>

<style scoped></style>
