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
import useLocalModel from "./composition/use-local-model";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    modelValue: { type: [String, Number, Boolean, Array], default: undefined },
    type: { type: String, default: "text" },
    state: { type: String, default: "" },
    name: { type: String, default: "input" },
    theme: { type: String, default: "default" },
    styleInput: { type: [String, Array], default: "default" },
    styleValid: { type: [String, Array], default: "default" },
    styleInvalid: { type: [String, Array], default: "default" },
    styleDisabled: { type: [String, Array], default: "default" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    let elements = [
      "input",
      "valid",
      "invalid",
      "disabled",
    ];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let classes = {
      input: computed(() => {
        let c = [
          ...styles.input.value,
          ...(props.state == "valid"
            ? styles.valid.value
            : props.state == "invalid"
            ? styles.invalid.value
            : ""),
          ...(attrs.disabled === "" || attrs.disabled === true
            ? styles.disabled.value
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
