import { ref } from "vue";

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: null,
  invalid: null,
}

let globalValidators = {
  minLength: (value, length) => {
    return value.length >= length 
  },
  alpha: (value, active) => {
    return /^[a-zA-Z]+$/.test(value);
  }
}

let getValidateStatus = (v, validateRef) => {
  let { validators, status } = validateRef

  let newStatus = {
    touched: true,
    dirty: v && !!v.length || status.dirty,
  }

  // if (v === undefined) return newStatus
  let currentValue = v === undefined ? validateRef.model : v

  let res = true

  for (let [key, value] of Object.entries(validators)) {
    if (globalValidators[key]) {
      newStatus[key] = globalValidators[key](currentValue, value)
      res = res && newStatus[key]
    }
    if (typeof validators[key] === "function") {
      newStatus[key] = validators[key](currentValue)
      res = res && newStatus[key]
    }
  }

  newStatus.valid = res
  newStatus.invalid = !res

  return newStatus
}

export default function useValidateRef(model, v) {
    let user = ref({
      _isValidateRef: true,
      model,
      validators: v || {},
      status: { ...defaultStatus },
      validate(value) {
        let status = getValidateStatus(value, this)

        return {
          ...this,
          status,
          model: value,
        }
      }
    })

  return user
}
