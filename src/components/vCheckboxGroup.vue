<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script setup>
import { ref, provide, inject } from "vue";
import useValidation from "./composition/use-validation"

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: undefined,
  },
  rules: { type: Object, default: {} },
});

const emit = defineEmits([
  "update:modelValue",
  "update:status",
  "update:state",
  "update:messages",
]);

let value = ref(props.modelValue)

let { rules } = props;

let { status, state, messages, touch, formValidate, reset } = useValidation(
  rules,
  value,
  null,
  null,
  null,
  {
    validateOn: "form",
    validateMode: "silent",
  }
);

provide("checkbox-group-validation", { status, state, messages, touch, formValidate, reset });

let { addFormInput } = inject("form", {});

if (addFormInput) addFormInput({ status, formValidate, reset });

let updateValue = (newValue) => {
  value.value = newValue
  emit("update:modelValue", value.value)
}

provide("checkbox-group", { value, updateValue });
</script>

<style scoped lang="postcss"></style>
