<template>
  <div>
    <!-- @slot default -->
    <slot name="default"></slot>
  </div>
</template>

<script setup>
import { ref, provide, inject, toRef } from "vue";
import useValidation from "./composition/use-validation";
import { sharedValidationProps, sharedFormProps } from "../shared-props";

const props = defineProps({
  ...sharedFormProps("radio-group"),
  ...sharedValidationProps("input", {
    validateMode: "silent",
  }),
  modelValue: {
    type: [String, Boolean],
    default: undefined,
  },
});

const emit = defineEmits([
  "update:modelValue",
  "validation:status",
  "validation:state",
  "validation:messages",
]);

let groupModel = ref(props.modelValue);

// validation

let emitValidationStatus = (status, state, messages) => {
  emit("validation:status", status.value);
  emit("validation:state", state.value);
  emit("validation:messages", messages.value);
};

let resetInput = () => {
  groupModel.value = "";
};

let externalState = toRef(props, "validationState");

let { rules, validateMode } = props;

let validation = useValidation({
  name: "radio-group",
  value: groupModel,
  rules,
  options: {
    validateOn: "form",
    validateMode,
  },
  externalState,
  onUpdate: emitValidationStatus,
  onReset: resetInput,
});

provide("v-radio-group-validation", validation);

let { addFormInput } = inject("form", {});

if (addFormInput) addFormInput(validation);

let onUpdateGroupModel = (newValue) => {
  groupModel.value = newValue;
  emit("update:modelValue", groupModel.value);
};

provide("v-radio-group", {
  groupModel,
  onUpdateGroupModel,
  isInGroup: true,
});

defineExpose({ validate: validation.formValidate, reset: validation.reset });
</script>
