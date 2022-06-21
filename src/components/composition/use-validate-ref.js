import { ref, computed } from "vue";
import { globalValidators } from "../../validators";

let isString = (v) => typeof v === "string";

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: true,
  wasInvalid: false,
  wasValid: false,
};

let forms = {}

let addToForm = (ref, form) => {
  if (!form) return
  form.inputs.push(ref)

  return form
}

let getValidateFormStatus = (form) => {
  if (!form) return

  let newStatus = {
    touched: form.inputs.some((i) => i.status.value.touched),
    dirty: form.inputs.some((i) => i.status.value.dirty),
    valid: form.inputs.every((i) => i.status.value.valid)
  }

  newStatus.wasInvalid = newStatus.wasInvalid || (!newStatus.valid && newStatus.touched)

  return newStatus
}

let getValidateStatus = ({ validators, status, model }) => {
  let valueToValidate = model.value;

  let newStatus = {
    ...defaultStatus,
    touched: status.value.touched,
    wasInvalid: status.value.wasInvalid,
    wasValid: status.value.wasValid,
    dirty: status.value.dirty || !!(valueToValidate && !!valueToValidate.length),
  };

  for (let [key, value] of Object.entries(validators)) {
    if (globalValidators[key]) {
      newStatus[key] = globalValidators[key](valueToValidate, value);
    } else if (typeof validators[key] === "function") {
      newStatus[key] = validators[key](valueToValidate);
    }
    newStatus.valid = newStatus.valid && newStatus[key];
  }

  newStatus.wasValid = newStatus.wasValid || newStatus.valid
  newStatus.wasInvalid = newStatus.wasInvalid || (!newStatus.valid && (newStatus.wasValid || status.value.touched))  

  return newStatus;
};

export default function useValidate() {
  let validateForm = (form) => {
    if (!forms[form]) {
      forms[form] = {
        inputs: [],
        status: ref({
          ...defaultStatus,
        }),
        validate() {
          this.inputs.forEach((i) => {
            i.touch()
            this.status.value = getValidateFormStatus(this)
        })
        }
      }

      return forms[form]
    }
  }

  let validateRef = (model, validators, form) => {
  let m = {
    _isValidateRef: true,
    model: ref(model),
    validators: validators || {},
    status: ref({ ...defaultStatus }),
    touch() {
      this.status.value.touched = true;
      this.status.value = getValidateStatus(this)
    },
  };

  if (form) m.form = addToForm(m, form)

  return computed({
    get() {
      return m;
    },
    set(value) {
      if (isString(value) || Array.isArray(value)) m.model.value = value;
      m.status.value = getValidateStatus(m);
    },
  });
  }

  return { validateRef, validateForm }
}
