import { computed } from "vue";

export default function useLocalModel(props, emit, updateValue, groupValue) {
  return computed({
    get() {
      return groupValue ? groupValue.value : props.modelValue
    },
    set(value) {
      if (updateValue) {
        updateValue(value)
      }
      emit("update:modelValue", value);
    },
  });
}
