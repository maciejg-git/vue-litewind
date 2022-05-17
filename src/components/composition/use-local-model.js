import { computed } from "vue";

export default function useLocalModel(props, emit) {
    let updateLocalModel = (value) => {
        let m = props.modelValue
        if (m._isValidateRef) {
          let validateRef = m.validate(value)
          emit("update:modelValue", validateRef);
          return
        } 
          emit("update:modelValue", value);
    } 

    return {
      localModel: computed({
      get() {
        return props.modelValue._isValidateRef ? props.modelValue.model : props.modelValue;
      },
      set(value) {
        updateModel(value)
      },
    }),
      updateLocalModel,

    }
}
