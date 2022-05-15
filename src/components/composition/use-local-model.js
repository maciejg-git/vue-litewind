import { computed } from "vue";

let validators = {
  minLength: (value, length) => {
    return value.length >= length 
  }
}

let validate = (value) => {

}

export default function useLocalModel(props, emit) {
    return computed({
      get() {
        return props.modelValue.model;
      },
      set(value) {
        let m = props.modelValue
        if (m._isValidateRef) {
          // let status = {}
          // for (let v in m.validate) {
          //   let res = validators[v] && validators[v](value, validate[v])
          // }
          emit("update:modelValue", { ...m, model: value});
        } else {
          emit("update:modelValue", value);
        }
      },
    });
}
