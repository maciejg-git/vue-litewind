<template>
  <input
    v-bind="$attrs"
    v-model="localModel"
    type="radio"
    :class="classes.radio.value"
  />
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    modelValue: { type: [Array, Boolean, String], default: undefined },
    state: { type: [String, Boolean], default: "" },
    name: { type: String, default: "radio" },
    theme: { type: String, default: "default" },
    styleRadio: { type: [String, Array], default: "default" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    let elements = ["radio"];

    let s = ["valid", "invalid", "disabled"];

    let { styles, states } = useStyles(
      getCurrentInstance(),
      props,
      elements,
      s
    );

    let classes = {
      radio: computed(() => {
        let c = [
          ...styles.radio.value,
          ...(props.state == "valid" || props.state === true
            ? states.radio.valid
            : props.state == "invalid" || props.state === false
            ? states.radio.invalid
            : props.state == "normal" ||
              props.state === null ||
              props.state === undefined
            ? ""
            : ""),
          ...(attrs.disabled === "" || attrs.disabled === true
            ? states.radio.disabled
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
