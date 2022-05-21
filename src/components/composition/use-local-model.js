import { computed } from "vue";

export default function useLocalModel(props, emit) {
  return computed({
    get() {
      return props.modelValue._isValidateRef
        ? props.modelValue.model.value
        : props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });
}
