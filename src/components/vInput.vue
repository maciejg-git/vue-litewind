<template>
  <input
    v-bind="$attrs"
    v-model="localModel"
    :type="type"
    :class="classes.input.value"
  />
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    modelValue: { type: [String, Number, Boolean, Array], default: undefined },
    type: { type: String, default: "text" },
    state: { type: [String, Boolean], default: "" },
    name: { type: String, default: "input" },
    theme: { type: String, default: "default" },
    styleInput: { type: [String, Array], default: "default" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    let elements = ["input"];

    let s = ["valid", "invalid", "disabled"];

    let { styles, states } = useStyles(
      getCurrentInstance(),
      props,
      elements,
      s
    );

    let classes = {
      input: computed(() => {
        let c = [
          ...styles.input.value,
          ...(props.state == "valid" || props.state === true
            ? states.input.valid
            : props.state == "invalid" || props.state === false
            ? states.input.invalid
            : props.state == "normal" ||
              props.state === null ||
              props.state === undefined
            ? ""
            : ""),
          ...(attrs.disabled === "" || attrs.disabled === true
            ? states.input.disabled
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
