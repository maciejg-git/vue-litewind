import { ref, computed } from "vue";
import { globalValidators } from "../../validators";

let isString = (v) => typeof v === "string";

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: true,
  isValidated() {
    return this.dirty && this.touched
  }
};

// shared form status

let formStatus = {};

let getFormStatus = (form) => {
  if (!form) return
  if (formStatus[form]) return formStatus[form]
  formStatus[form] = ref({ ...defaultStatus });
  return formStatus[form]
}

//  FIX:
let updateFormStatus = (status, { touched, dirty, valid }) => {
  status.value.touched = status.value.touched || touched;
  status.value.dirty = status.value.dirty || dirty;
  status.value.valid = status.value.valid && valid;
}

let getValidateStatus = ({ validators, status, model, formStatus }) => {
  let v = model.value

  let newStatus = {
    ...defaultStatus,
    touched: status.value.touched,
    dirty: (v && !!v.length) || status.value.dirty,
  };

  for (let [key, value] of Object.entries(validators)) {
    if (globalValidators[key]) {
      newStatus[key] = globalValidators[key](v, value);
    } else if (typeof validators[key] === "function") {
      newStatus[key] = validators[key](v);
    }
    newStatus.valid = newStatus.valid && newStatus[key];
  }

  updateFormStatus(formStatus, newStatus)

  return newStatus;
};

export default function useValidateRef(model, validators, form) {
  let m = {
    _isValidateRef: true,
    _isValid() {
      return this.status.value.valid;
    },
    _isValidated() {
      return this.status.value.isValidated();
    },
    _isTouched() {
      return this.status.value.touched;
    },
    _isDirty() {
      return this.status.value.dirty;
    },
    model: ref(model),
    validators: validators || {},
    status: ref({ ...defaultStatus }),
    formStatus: getFormStatus(form),
    touch() {
      this.status.value.touched = true;
      this.status.value = getValidateStatus(this);
    },
    getValidStatus() {
      return !this._isValidated() ? "" : this._isValid() ? "valid" : "invalid";
    },
  };

  return computed({
    get() {
      return m;
    },
    set(value) {
      if (isString(value) || Array.isArray(value)) m.model.value = value
      m.status.value = getValidateStatus(m);
    },
  });
}
