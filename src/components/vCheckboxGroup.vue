<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script setup>
import { ref, provide, inject, toRef } from "vue";
import useValidation from "./composition/use-validation";

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: undefined,
  },
  rules: {
    type: Object,
    default: {},
  },
  state: {
    type: String,
    default: null,
  },
  validateMode: {
    type: String,
    default: "silent",
  },
});

const emit = defineEmits([
  "update:modelValue",
  "update:status",
  "update:state",
  "update:messages",
]);

let groupModel = ref(props.modelValue);

// validation

let emitValidationStatus = (status, state, messages) => {
  emit("update:status", status.value);
  emit("update:state", state.value);
  emit("update:messages", messages.value);
};

let resetInput = () => {
  groupModel.value = [];
};

let externalState = toRef(props, "state");

let { rules, validateMode } = props;

let { status, state, messages, touch, formValidate, reset } = useValidation(
  rules,
  groupModel,
  externalState,
  emitValidationStatus,
  resetInput,
  {
    validateOn: "form",
    validateMode,
  }
);

provide("v-checkbox-group-validation", {
  status,
  state,
  messages,
  touch,
  formValidate,
  reset,
});

let { addFormInput } = inject("form", {});

if (addFormInput) addFormInput({ status, formValidate, reset });

let onUpdateGroupModel = (newValue) => {
  groupModel.value = newValue;
  emit("update:modelValue", groupModel.value);
};

provide("v-checkbox-group", {
  groupModel,
  onUpdateGroupModel,
  isInGroup: true,
});

defineExpose({ validate: formValidate, reset });
</script>
