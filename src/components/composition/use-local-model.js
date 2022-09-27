import { computed } from "vue";

export default function useLocalModel(props, emit, updateValue, value) {
  return computed({
    get() {
      console.log('get')
      return value ? value.value : props.modelValue
    },
    set(value) {
      console.log('set')
      emit("update:modelValue", value);

      if (updateValue) updateValue(value)
    },
  });
}
