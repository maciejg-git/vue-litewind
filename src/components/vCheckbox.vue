<template>
  <div class="flex items-center">
    <input
      v-model="localModel"
      v-bind="$attrs"
      :id="id"
      type="checkbox"
      :class="getCheckBoxClasses()"
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
import { ref, watch, inject } from "vue";
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
      type: [Array, Boolean, Object],
      default: undefined,
    },
    rules: {
      type: Object,
      default: {},
    },
    label: {
      type: String,
      default: "",
    },
    styleCheckbox: {
      type: [String, Array],
      default: defaultProps("checkbox", "styleCheckbox", ""),
    },
    styleLabel: {
      type: [String, Array],
      default: defaultProps("checkbox", "styleInput", ""),
    },
    ...sharedFormProps(null),
    ...sharedStyleProps("checkbox"),
  },
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles("checkbox", props, {
      checkbox: {
        states: ["valid", "invalid", "disabled"],
      },
      label: null,
    });

    let getCheckBoxClasses = () => {
      return [
        "tw-form-checkbox-reset",
        classes.checkbox.value,
        states.checkbox.value && states.checkbox.value[state.value],
        attrs.disabled === "" || attrs.disabled === true
          ? states.checkbox.disabled
          : "",
      ];
    };

    let id = useUid("checkbox", attrs);

    let { value, updateValue, touch, state } = inject("checkbox-group", {
      state: ref(""),
    });

    watch(
      () => props.state,
      (newState) => (state.value = newState),
      { immediate: true }
    );

    let localModel = useLocalModel(props, emit, updateValue, value);

    let handleBlur = () => {
      if (touch) touch();
    };

    return {
      classes,
      getCheckBoxClasses,
      id,
      state,
      localModel,
      handleBlur,
    };
  },
};
</script>

<style>
.tw-form-checkbox-reset {
  @apply form-checkbox
}
</style>
