import { computed } from "vue";

export default function useLocalModel(props, emit) {
  let updateLocalModel = (value) => emit("update:modelValue", value);

  return {
    localModel: computed({
      get() {
        return props.modelValue._isValidateRef
          ? props.modelValue.model.value
          : props.modelValue;
      },
      set(value) {
        updateLocalModel(value);
      },
    }),
    updateLocalModel,
  };
}
