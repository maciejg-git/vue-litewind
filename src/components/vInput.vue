<template>
  <input
    v-model="localModel"
    :type="type"
    :class="[
      classes.input.value,
      states.input.value && states.input.value[state],
      attrs.disabled === '' || attrs.disabled === true
        ? states.input.disabled
        : '',
    ]"
  />
</template>

<script>
import { computed } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model"
import { sharedStyleProps } from "../sharedProps"

export default {
  props: {
    modelValue: { type: [String, Number, Boolean, Array], default: undefined },
    type: { type: String, default: "text" },
    state: { type: [String, Boolean], default: "" },
    styleInput: { type: [String, Array], default: "" },
    ...sharedStyleProps("input"),
  },
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles("input", props, {
      input: {
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
