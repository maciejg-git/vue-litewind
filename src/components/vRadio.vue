<template>
  <div class="flex items-center">
    <input
      v-bind="$attrs"
      v-model="localModel"
      type="radio"
      :id="id"
      :class="getRadioClasses()"
      @blur="handleBlur"
    />
    <label v-if="label" :for="id" :class="classes.label.value">
      <slot name="default" :label="label">
        {{ label }}
      </slot>
    </label>
  </div>
</template>

<script>
// vue
import { inject } from "vue";
// composition
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import useUid from "./composition/use-uid";
// props
import { sharedProps, sharedStyleProps, sharedFormProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

export default {
  props: {
    ...sharedProps(),
    modelValue: {
      type: [Array, Boolean, String],
      default: undefined,
    },
    label: {
      type: String,
      default: "",
    },
    styleRadio: {
      type: String,
      default: defaultProps("radio", "styleRadio", ""),
    },
    styleLabel: {
      type: String,
      default: defaultProps("radio", "styleLabel", ""),
    },
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
        "tw-form-radio-reset",
        classes.radio.value,
        states.radio.value && states.radio.value[state.value],
        attrs.disabled === "" || attrs.disabled === true
          ? states.radio.disabled
          : "",
      ];
    };

    let id = useUid("input", attrs);

    let { value, updateValue, touch, state } = inject("radio-group", {
      state: "",
    });

    let localModel = useLocalModel(props, emit, updateValue, value);

    let handleBlur = () => {
      if (touch) touch();
    };

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

<style>
.tw-form-radio-reset {
  @apply form-radio
}
</style>
