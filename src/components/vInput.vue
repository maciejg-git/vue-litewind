<template>
  <input
    v-bind="$attrs"
    v-model="localModel"
    :type="type"
    :class="classes.input.value"
  />
  <div v-if="state == 'invalid'" :class="classes.textInvalid.value">
    <slot name="invalid"></slot>
  </div>
  <div :class="classes.textHelper.value">
    <slot name="helper"></slot>
  </div>
</template>

<script>
import { ref, computed, watch, getCurrentInstance } from "vue";
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
    styleTextHelper: { type: [String, Array], default: "default" },
    styleTextInvalid: { type: [String, Array], default: "default" },
  },
  setup(props, { emit }) {
    let elements = ["input", "valid", "invalid", "textHelper", "textInvalid"];

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
      textHelper: computed(() => {
        let c = [...styles.textHelper.value];
        return removeTailwindClasses(c);
      }),
      textInvalid: computed(() => {
        let c = [...styles.textInvalid.value];
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
      localModel
    };
  },
};
</script>

<style scoped></style>
