<template>
  <input
    v-model="localModel"
    v-bind="$attrs"
    type="checkbox"
    :class="getCheckBoxClasses()"
    @blur="handleBlur"
  />
</template>

<script>
// vue
import { inject } from "vue";
// composition
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
// props
import { sharedStyleProps, sharedFormProps } from "../shared-props";

export default {
  props: {
    modelValue: { type: [Array, Boolean, Object], default: undefined },
    rules: { type: Object, default: {} },
    styleCheckbox: { type: [String, Array], default: "" },
    ...sharedFormProps(null),
    ...sharedStyleProps("checkbox"),
  },
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles("checkbox", props, {
      checkbox: {
        states: ["valid", "invalid", "disabled"],
      },
    });

    let getCheckBoxClasses = () => {
      return [
        classes.checkbox.value,
        states.checkbox.value && states.checkbox.value[state.value],
        attrs.disabled === "" || attrs.disabled === true
          ? states.checkbox.disabled
          : "",
      ];
    };

    let { groupValue, updateValue, touch, state } = inject(
      "checkbox-group",
      {}
    );

    let localModel = useLocalModel(
      props,
      emit,
      updateValue,
      groupValue
    );

    let handleBlur = () => touch();

    return {
      classes,
      states,
      getCheckBoxClasses,
      state,
      localModel,
      handleBlur,
    };
  },
};
</script>

<style scoped></style>
