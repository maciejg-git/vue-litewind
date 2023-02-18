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
    <label
      v-if="label"
      :for="id"
      :class="classes.label.value"
    >
      <slot
        name="default"
        :label="label"
      >
        {{ label }}
      </slot>
    </label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { ref, watch, inject, useAttrs, toRef } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import useUid from "./composition/use-uid";
import useValidation from "./composition/use-validation"
import {
  sharedProps,
  sharedStyleProps,
  sharedFormProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("checkbox"),
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
});

const emit = defineEmits([
  "update:modelValue",
  "update:status",
  "update:state",
  "update:messages"
]);

const attrs = useAttrs();

let { classes, states } = useStyles("checkbox", props, {
  checkbox: {
    states: ["valid", "invalid"],
  },
  label: null,
});

let getCheckBoxClasses = () => {
  return [
    "tw-form-checkbox-reset",
    classes.checkbox.value,
    state.value === 'valid' && states.checkbox.value.valid,
    state.value === 'invalid' && states.checkbox.value.invalid,
    (attrs.disabled === "" || attrs.disabled === true) && "disabled"
  ];
};

let id = useUid("checkbox", attrs);

let { value, updateValue } = inject("checkbox-group", {})

let localModel = useLocalModel(props, emit, updateValue, value);

let emitValidationStatus = (status, state, messages) => {
  emit("update:status", status.value);
  emit("update:state", state.value);
  emit("update:messages", messages.value);
};

let resetInput = () => {
  localModel.value = false;
};

let externalState = toRef(props, "state");

let { rules } = props;

let { status, state, messages, touch, formValidate, reset } = inject("checkbox-group-validation",
  useValidation(
  rules,
  localModel,
  externalState,
  emitValidationStatus,
  resetInput,
  {
    validateOn: "form",
    validateMode: "silent",
  }
)
);

let handleBlur = () => {
  if (touch) touch();
};
</script>

<style>
</style>
