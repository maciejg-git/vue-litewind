<template>
  <input
    v-bind="$attrs"
    v-model="localModel"
    type="radio"
    :class="[
      classes.radio.value,
      states.radio.value && states.radio.value[state],
      attrs.disabled === '' || attrs.disabled === true
        ? states.radio.disabled
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
    modelValue: { type: [Array, Boolean, String], default: undefined },
    state: { type: [String, Boolean], default: "" },
    styleRadio: { type: [String, Array], default: "" },
    ...sharedStyleProps("radio"),
  },
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles("radio", props, {
      radio: {
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
