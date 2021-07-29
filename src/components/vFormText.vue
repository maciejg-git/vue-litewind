<template>
  <div>
    <slot name="default" :class="classes.value.text"></slot>
  </div>
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    modelValue: { type: [String, Number, Boolean, Array], default: undefined },
    type: { type: String, default: "text" },
    state: { type: String, default: "" },
    name: { type: String, default: "input" },
    theme: { type: String, default: "default" },
    styleFormText: { type: [String, Array], default: "default" },
    styleFormTextValid: { type: [String, Array], default: "default" },
    styleFormTextInvalid: { type: [String, Array], default: "default" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    let elements = [
      "formText",
      "formTextValid",
      "formTextInvalid",
    ];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let classes = {
      text: computed(() => {
        let c = [
        ];
        return removeTailwindClasses(c);
      }),
    };

    return {
      classes,
    };
  },
};
</script>

<style scoped></style>
