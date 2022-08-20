<template>
  <div class="flex items-center">
    <input
      v-model="localModel"
      v-bind="$attrs"
      type="checkbox"
      :class="getCheckBoxClasses()"
      @blur="handleBlur"
    />
    <slot name="default" :label="label">
      <label v-if="label" :for="id" :class="classes.label.value">{{ label }}</label>
    </slot>
  </div>
</template>

<script>
// vue
import { ref, watch, inject } from "vue";
// composition
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
// props
import { sharedStyleProps, sharedFormProps } from "../shared-props";

export default {
  props: {
    modelValue: { type: [Array, Boolean, Object], default: undefined },
    rules: { type: Object, default: {} },
    label: { type: String, default: "" },
    styleCheckbox: { type: [String, Array], default: "" },
    styleLabel: { type: [String, Array], default: "" },
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
        classes.checkbox.value,
        states.checkbox.value && states.checkbox.value[state.value],
        attrs.disabled === "" || attrs.disabled === true
          ? states.checkbox.disabled
          : "",
      ];
    };

    let { id } = attrs;

    let { value, updateValue, touch, state } = inject("checkbox-group", {
      state: ref(""),
    });

    watch(
      () => props.state,
      (newState) => (state.value = newState),
      { immediate: true },
    );

    let localModel = useLocalModel(props, emit, updateValue, value);

    let handleBlur = () => {
      if (touch) touch();
    };

    return {
      classes,
      getCheckBoxClasses,
      state,
      localModel,
      id,
      handleBlur,
    };
  },
};
</script>

<style scoped></style>
