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
import { computed } from "vue";
// composition
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
// props
import { sharedStyleProps, sharedFormProps } from "../shared-props";

export default {
  props: {
    modelValue: { type: [Array, Boolean, Object], default: undefined },
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

    let localModel = useLocalModel(props, emit);

    let getCheckBoxClasses = () => {
      return [
        classes.checkbox.value,
        states.checkbox.value && states.checkbox.value[state.value],
        attrs.disabled === "" || attrs.disabled === true
          ? states.checkbox.disabled
          : "",
      ];
    };

    let state = computed(() => {
      if (props.modelValue && props.modelValue._isValidateRef) {
        return props.modelValue.getValidStatus()
      }
    });

    let handleBlur = () => {
      if (props.modelValue && props.modelValue._isValidateRef) {
        props.modelValue.touch();
      }
    };

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
