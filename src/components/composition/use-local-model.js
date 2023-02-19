import { computed } from "vue";

export default function useLocalModel(
  props,
  emit,
  externalModel,
  onUpdateModel
) {
  return computed({
    get() {
      return externalModel ? externalModel.value : props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);

      if (onUpdateModel) onUpdateModel(value);
    },
  });
}
