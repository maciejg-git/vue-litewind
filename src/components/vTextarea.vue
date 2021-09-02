<template>
  <textarea
    v-bind="$attrs"
    v-model="localModel"
    :class="[
      classes.textarea.value,
      states.textarea[state] && states.textarea[state].value,
      attrs.disabled === '' || attrs.disabled === true
        ? states.textarea.disabled
        : '',
    ]"
  ></textarea>
</template>

<script>
import { computed } from "vue";
import useStyles from "./composition/use-styles";

export default {
  props: {
    modelValue: { type: String, default: undefined },
    type: { type: String, default: "text" },
    state: { type: [String, Boolean], default: "" },
    name: { type: String, default: "textarea" },
    styleTextarea: { type: [String, Array], default: "" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles(props, {
      textarea: {
        states: ["valid", "invalid", "disabled"],
      },
    });

    let state = computed(() =>
      props.state === true
        ? "valid"
        : props.state === false
        ? "invalid"
        : props.state === null
        ? ""
        : props.state
    );

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
      state,
      states,
      localModel,
      attrs,
    };
  },
};
</script>

<style scoped></style>
