<template>
  <textarea
    v-bind="$attrs"
    v-model="localModel"
    :class="classes.textarea.value"
  ></textarea>
</template>

<script>
import { computed, inject } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    modelValue: { type: String, default: undefined },
    type: { type: String, default: "text" },
    state: { type: [String, Boolean], default: "" },
    name: { type: String, default: "textarea" },
    theme: { type: String, default: "default" },
    styleTextarea: { type: [String, Array], default: "default" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    let style = inject("styles")

    let elements = ["textarea"];

    let s = ["valid", "invalid", "disabled"];

    let { styles, states } = useStyles(
      style,
      props,
      elements,
      s
    );

    let classes = {
      textarea: computed(() => {
        let c = [
          ...styles.textarea.value,
          ...(props.state == "valid" || props.state === true
            ? states.textarea.valid
            : props.state == "invalid" || props.state === false
            ? states.textarea.invalid
            : props.state == "normal" ||
              props.state === null ||
              props.state === undefined
            ? ""
            : ""),
          ...(attrs.disabled === "" || attrs.disabled === true
            ? states.textarea.disabled
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
