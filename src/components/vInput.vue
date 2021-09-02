<template>
  <input
    v-bind="$attrs"
    v-model="localModel"
    :type="type"
    :class="[
      classes.input.value,
      states.input[state] && states.input[state].value,
      attrs.disabled === '' || attrs.disabled === true
        ? states.input.disabled
        : '',
    ]"
  />
</template>

<script>
import { computed } from "vue";
import useStyles from "./composition/use-styles";

export default {
  props: {
    modelValue: { type: [String, Number, Boolean, Array], default: undefined },
    type: { type: String, default: "text" },
    state: { type: [String, Boolean], default: "" },
    name: { type: String, default: "input" },
    styleInput: { type: [String, Array], default: "" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles(props, {
      input: {
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
      states,
      state,
      localModel,
      attrs,
    };
  },
};
</script>

<style scoped></style>
