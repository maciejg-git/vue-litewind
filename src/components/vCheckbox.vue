<template>
  <input
    v-bind="$attrs"
    v-model="localModel"
    type="checkbox"
    :class="[
      classes.checkbox.value,
      states.checkbox.value && states.checkbox.value[state],
      attrs.disabled === '' || attrs.disabled === true
        ? states.checkbox.disabled
        : '',
    ]"
  />
</template>

<script>
import { computed } from "vue";
import useStyles from "./composition/use-styles";

export default {
  props: {
    modelValue: { type: [Array, Boolean], default: undefined },
    state: { type: [String, Boolean], default: "" },
    name: { type: String, default: "checkbox" },
    styleCheckbox: { type: [String, Array], default: "" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles("checkbox", props, {
      checkbox: {
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
