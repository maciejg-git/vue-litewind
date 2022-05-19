import { ref, computed } from "vue";

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: true,
}

let globalValidators = {
  minLength: (value, length) => {
    return value.length >= length 
  },
  alpha: (value, active) => {
    return /^[a-zA-Z]+$/.test(value);
  },
  numeric: (value, active) => {
    return /^[0-9]+$/.test(value);
  },
  alphanumeric: (value, active) => {
    return /^[a-zA-Z0-9]+$/.test(value);
  },
  required: (value) => {
    return !!value
  },
}

let getValidateStatus = (v, { validators, status, model }) => {
  let newStatus = {
    touched: status.value.touched,
    dirty: (v && !!v.length) || status.value.dirty,
  }

  v = v === undefined ? model.value : v

  let isValid = true

  for (let [key, value] of Object.entries(validators)) {
    if (globalValidators[key]) {
      newStatus[key] = globalValidators[key](v, value)
    } else if (typeof validators[key] === "function") {
      newStatus[key] = validators[key](v)
    }
    isValid = isValid && newStatus[key]
  }

  newStatus.valid = isValid

  return newStatus
}

export default function useValidateRef(model, v) {
  //   let user = ref({
  //     _isValidateRef: true,
  //     _validateOnBlur: true,
  //     model,
  //     validators: v || {},
  //     status: { ...defaultStatus },
  //     localEmit(value) {
  //       let status = this.validate(value)
  //       emit("ev", {...this, status, model: value})
  //     },
  //     validate(value) {
  //       value = value === undefined ? this.model : value;
  //       let status = getValidateStatus(value, this)
  //
  //       return {
  //         ...this,
  //         status,
  //         model: value,
  //       }
  //     }
  //   })
  //
  // return user

  let m = {
    _isValidateRef: true,
    _isValidated() {
      return this.status.value.touched || this.status.value.dirty
    },
    _isValid() {
      return this.status.value.valid
    },
    _isTouched() {
      return this.status.value.touched
    },
    model: ref(""),
    validators: v || {},
    status: ref({ ...defaultStatus }),
    touch() {
      this.status.value.touched = true
    }
  }

      return computed({
      get() {
        return m;
      },
      set(value) {
        console.log(value)
        if (value !== undefined) {
          m.model.value = value
        }
        m.status.value = getValidateStatus(value, m)
      },
    })


  // custom ref

  // let status = ref({ ...defaultStatus })
  // let validators = v || {}
  // let m = ref("")
  //
  //   let user = computed({
  //     get() {
  //       return m.value
  //     },
  //     set(value) {
  //       status.value = getValidateStatus(value, { validators, status })
  //       console.log(status)
  //       m.value = value
  //     },
  //   })
  //
  // return { _isValidateRef: true, user, status }
}
