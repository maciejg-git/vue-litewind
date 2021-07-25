<template>
  <input
    v-bind="$attrs"
    v-model="localModel"
    type="checkbox"
    :class="classes.checkbox.value"
  />
  <!-- <div v-if="state == 'invalid'" :class="classes.textInvalid.value"> -->
  <!--   <slot name="invalid"></slot> -->
  <!-- </div> -->
  <!-- <div :class="classes.textHelper.value"> -->
  <!--   <slot name="helper"></slot> -->
  <!-- </div> -->
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    modelValue: { type: Boolean, default: undefined },
    type: { type: String, default: "text" },
    state: { type: String, default: "" },
    name: { type: String, default: "checkbox" },
    theme: { type: String, default: "default" },
    styleCheckbox: { type: [String, Array], default: "default" },
    styleValid: { type: [String, Array], default: "default" },
    styleInvalid: { type: [String, Array], default: "default" },
    styleTextHelper: { type: [String, Array], default: "default" },
    styleTextInvalid: { type: [String, Array], default: "default" },
    styleDisabled: { type: [String, Array], default: "default" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    let elements = [
      "checkbox",
      "valid",
      "invalid",
      "textHelper",
      "textInvalid",
      "disabled",
    ];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let classes = {
      checkbox: computed(() => {
        let c = [
          "appearance-none", "w-4", "h-4",
          ...styles.checkbox.value,
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
      localModel,
    };
  },
};
</script>

<style scoped></style>
