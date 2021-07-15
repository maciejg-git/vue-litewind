<template>
  <input
    :type="type"
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    :class="classes.input.value"
  />
  <div>
    <slot name="invalid"></slot>
  </div>
  <div>
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
    type: { type: String, default: "text" },
    state: { type: String, default: "" },
    name: { type: String, default: "input" },
    theme: { type: String, default: "default" },
    styleInput: { type: [String, Array], default: "default" },
    styleValid: { type: [String, Array], default: "default" },
    styleInvalid: { type: [String, Array], default: "default" },
  },
  setup(props, { emit }) {
    let elements = ["input", "valid", "invalid"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let classes = {
      input: computed(() => {
        let c = [
          ...styles.input.value,
          ...(props.state == "valid"
            ? [...styles.valid.value]
            : props.state == "invalid"
            ? [...styles.invalid.value]
            : [""]),
        ];
        return removeTailwindClasses(c);
      }),
    };

    return {
      classes,
      emit,
    };
  },
};
</script>

<style scoped></style>
