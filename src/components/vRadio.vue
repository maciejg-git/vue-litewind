<template>
  <div class="flex items-center">
  <input
    v-bind="$attrs"
    v-model="localModel"
    type="radio"
    :class="getRadioClasses()"
    @blur="handleBlur"
  />
    <slot name="default" :label="label">
      <label :for="id" :class="classes.label.value">{{ label }}</label>
    </slot>
  </div>
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
    modelValue: { type: [Array, Boolean, String], default: undefined },
    label: { type: String, default: "" },
    styleRadio: { type: [String, Array], default: "" },
    styleLabel: { type: [String, Array], default: "" },
    ...sharedFormProps(null),
    ...sharedStyleProps("radio"),
  },
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles("radio", props, {
      radio: {
        states: ["valid", "invalid", "disabled"],
      },
      label: null,
    });

    let getRadioClasses = () => {
      return [
        classes.radio.value,
        states.radio.value && states.radio.value[state.value],
        attrs.disabled === "" || attrs.disabled === true
          ? states.radio.disabled
          : "",
      ];
    };

    let { id } = attrs

    let { value, updateValue, touch, state } = inject(
      "radio-group",
      { state: "" }
    );

    let localModel = useLocalModel(props, emit, updateValue, value);

    let handleBlur = () => {
      if (touch) touch();
    }

    return {
      classes,
      states,
      getRadioClasses,
      state,
      localModel,
      id,
      handleBlur,
    };
  },
};
</script>

<style scoped></style>
