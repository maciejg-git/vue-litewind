<template>
  <textarea
    v-bind="$attrs"
    v-model="localModel"
    :class="[
      classes.textarea.value,
      states.textarea[state],
      attrs.disabled === '' || attrs.disabled === true
        ? states.textarea.disabled
        : '',
    ]"
  ></textarea>
</template>

<script>
import { computed } from "vue";
import useStyles from "./composition/use-styles 2";

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
    let { classes, states } = useStyles(props, {
      textarea: {
        states: ["valid", "invalid", "disabled"],
      },
    });

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
      states,
      localModel,
      attrs,
    };
  },
};
</script>

<style scoped></style>
