<template>
  <input
    v-bind="$attrs"
    v-model="localModel"
    type="radio"
    :class="getRadioClasses()"
  />
</template>

<script>
import { computed } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import { sharedStyleProps } from "../shared-props";

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

    let getRadioClasses = () => {
      return [
        classes.radio.value,
        states.radio.value && states.radio.value[state.value],
        attrs.disabled === "" || attrs.disabled === true
          ? states.radio.disabled
          : "",
      ];
    };

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
      getRadioClasses,
      state,
      localModel,
    };
  },
};
</script>

<style scoped></style>
