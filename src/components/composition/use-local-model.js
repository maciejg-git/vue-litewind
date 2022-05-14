import { computed } from "vue";

export default function useLocalModel(props, emit) {
    return computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        let val = props.modelValue
        emit("update:modelValue", { ...val, model: value});
      },
    });
}
