import { ref, computed } from "vue";
import { globalValidators } from "../../validators";

let isString = (v) => typeof v === "string";

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: true,
};

let formStatus = ref({});

let getValidateStatus = (v, { validators, status, model, formStatus }) => {
  let newStatus = {
    touched: status.value.touched,
    dirty: (v && !!v.length) || status.value.dirty,
    valid: true,
  };

  v = v === undefined || v === null ? model.value : v;

  for (let [key, value] of Object.entries(validators)) {
    if (globalValidators[key]) {
      newStatus[key] = globalValidators[key](v, value);
    } else if (typeof validators[key] === "function") {
      newStatus[key] = validators[key](v);
    }
    newStatus.valid = newStatus.valid && newStatus[key];
  }

  formStatus.touched = formStatus.touched || newStatus.touched;
  formStatus.dirty = formStatus.dirty || newStatus.dirty;
  formStatus.valid = formStatus.valid && newStatus.valid;

  return newStatus;
};

export default function useValidateRef(model, validators, form) {
  if (form) formStatus.value[form] = { ...defaultStatus };

  let m = {
    _isValidateRef: true,
    _isValid() {
      return this.status.value.valid;
    },
    _isValidated() {
      return this._isDirty() && this._isTouched();
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
    formStatus: formStatus.value[form],
    touch() {
      this.status.value.touched = true;
      this.status.value = getValidateStatus(null, this);
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
      if (isString(value)) m.model.value = value;
      m.status.value = getValidateStatus(value, m);
    },
  });
}
