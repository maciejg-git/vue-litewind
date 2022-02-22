import { computed } from "vue";

export default function useLocalModel(props, emit) {
    return computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      },
    });
}
