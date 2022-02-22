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
import useLocalModel from "./composition/use-local-model"

export default {
  props: {
    modelValue: { type: [Array, Boolean], default: undefined },
    state: { type: [String, Boolean], default: "" },
    name: { type: String, default: "checkbox" },
    styleCheckbox: { type: [String, Array], default: "" },
  },
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles("checkbox", props, {
      checkbox: {
        states: ["valid", "invalid", "disabled"],
      },
    });

    let localModel = useLocalModel(props, emit);

    let state = computed(() =>
      props.state === true
        ? "valid"
        : props.state === false
        ? "invalid"
        : props.state === null
        ? ""
        : props.state
    );

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
