import { computed } from "vue";

export default function useLocalModel(props, emit, updateValue, value) {
  return computed({
    get() {
      return value ? value.value : props.modelValue
    },
    set(value) {
      emit("update:modelValue", value);

      if (updateValue) updateValue(value)
    },
  });
}
