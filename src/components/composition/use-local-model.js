import { computed } from "vue";

export default function useLocalModel(props, emit, updateFormFieldValue) {
  return computed({
    get() {
      return props.modelValue && props.modelValue._isValidateRef
        ? props.modelValue.model.value
        : props.modelValue;
    },
    set(value) {
      if (updateFormFieldValue) {
        updateFormFieldValue(value)
        return
      }
      emit("update:modelValue", value);
    },
  });
}
