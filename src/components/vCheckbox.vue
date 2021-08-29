<template>
  <input
    v-bind="$attrs"
    v-model="localModel"
    type="checkbox"
    :class="[
      classes.checkbox.value,
      states.checkbox[state],
      attrs.disabled === '' || attrs.disabled === true
        ? states.checkbox.disabled
        : '',
    ]"
  />
</template>

<script>
import { computed } from "vue";
import useStyles from "./composition/use-styles 2";

export default {
  props: {
    modelValue: { type: [Array, Boolean], default: undefined },
    state: { type: [String, Boolean], default: "" },
    name: { type: String, default: "checkbox" },
    theme: { type: String, default: "default" },
    styleCheckbox: { type: [String, Array], default: "default" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles(props, {
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
