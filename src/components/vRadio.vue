<template>
  <input
    v-bind="$attrs"
    v-model="localModel"
    type="radio"
    :class="[
      classes.radio.value,
      states.radio[getFormState()],
      attrs.disabled === '' || attrs.disabled === true
        ? states.radio.disabled
        : '',
    ]"
  />
</template>

<script>
import { computed } from "vue";
import useStyles from "./composition/use-styles 2";
import useStates from "./composition/use-states";

export default {
  props: {
    modelValue: { type: [Array, Boolean, String], default: undefined },
    state: { type: [String, Boolean], default: "" },
    name: { type: String, default: "radio" },
    theme: { type: String, default: "default" },
    styleRadio: { type: [String, Array], default: "default" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles(props, {
      radio: {
        states: ["valid", "invalid", "disabled"],
      },
    });

    let { getFormState } = useStates(props);

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
      getFormState,
      localModel,
      attrs,
    };
  },
};
</script>

<style scoped></style>
