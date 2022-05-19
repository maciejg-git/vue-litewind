import { computed } from "vue";

export default function useLocalModel(props, emit) {
    // let updateLocalModel = (value) => {
    //     let m = props.modelValue
    //     if (m._isValidateRef) {
    //       let validated = m.validate(value)
    //       emit("update:modelValue", validated);
    //       return
    //     } 
    //       emit("update:modelValue", value);
    // } 
    //
    // return {
    //   localModel: computed({
    //   get() {
    //     return props.modelValue._isValidateRef ? props.modelValue.model : props.modelValue;
    //   },
    //   set(value) {
    //     updateLocalModel(value)
    //   },
    // }),
    //   updateLocalModel,
    //
    // }
    let updateLocalModel = (value) => emit("update:modelValue", value)

    //  return computed({
    //   get() {
    //     return props.modelValue;
    //   },
    //   set(value) {
    //     // emit("update:modelValue", value)
    //     updateLocalModel(value)
    //   },
    // })
    return {
      localModel: computed({
      get() {
        return props.modelValue._isValidateRef ? props.modelValue.model.value : props.modelValue;
      },
      set(value) {
        updateLocalModel(value)
      },
    }),
      updateLocalModel,

    }
}
