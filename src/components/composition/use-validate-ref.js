import { ref, computed } from "vue";

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: true,
};

let globalValidators = {
  minLength: (value, length) => {
    return value.length >= length;
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
    return !!value;
  },
  email: (value) => {
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value)
  }
};

let getValidateStatus = (v, { validators, status, model }) => {
  let newStatus = {
    touched: status.value.touched,
    dirty: (v && !!v.length) || status.value.dirty,
  };

  v = v === undefined || v === null ? model.value : v;

  newStatus.valid = true;

  for (let [key, value] of Object.entries(validators)) {
    if (globalValidators[key]) {
      newStatus[key] = globalValidators[key](v, value);
    } else if (typeof validators[key] === "function") {
      newStatus[key] = validators[key](v);
    }
    newStatus.valid = newStatus.valid && newStatus[key];
  }

  return newStatus;
};

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
    _isValid() {
      return this.status.value.valid;
    },
    _isValidated() {
      return this._isDirty() && this._isTouched()
    },
    _isTouched() {
      return this.status.value.touched;
    },
    _isDirty() {
      return this.status.value.dirty;
    },
    model: ref(""),
    validators: v || {},
    status: ref({ ...defaultStatus }),
    touch() {
      this.status.value.touched = true;
      this.status.value = getValidateStatus(null, this);
    },
  };

  return computed({
    get() {
      return m;
    },
    set(value) {
      if (value !== undefined) {
        m.model.value = value;
      }
      m.status.value = getValidateStatus(value, m);
    },
  });

  // custom ref
}
