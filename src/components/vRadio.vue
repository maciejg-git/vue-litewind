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
    modelValue: { type: [Array, Boolean], default: undefined },
    state: { type: String, default: "" },
    name: { type: String, default: "radio" },
    theme: { type: String, default: "default" },
    styleRadio: { type: [String, Array], default: "default" },
    styleValid: { type: [String, Array], default: "default" },
    styleInvalid: { type: [String, Array], default: "default" },
    styleDisabled: { type: [String, Array], default: "default" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    let elements = [
      "radio",
      "valid",
      "invalid",
      "disabled",
    ];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let classes = {
      radio: computed(() => {
        let c = [
          ...styles.radio.value,
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
