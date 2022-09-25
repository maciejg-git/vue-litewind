import { ref, watch } from "vue"
import { globalValidators } from "../../validators"
import { isFunction } from "../../tools"

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: false,
  validated: false,
};

export default function useValidation(rules, validateOn, validateMode, localModel, emitValidationStatus) {
let status = ref({ ...defaultStatus });
let state = ref("");
let messages = ref({});
let wasValid = ref(false);
let wasInvalid = ref(false);

watch(localModel, (value) => updateValue(value))

emitValidationStatus(status, state, messages)

let reset = () => {
  status.value = { ...defaultStatus };
  state.value = "";
  wasInvalid.value = false;
  wasValid.value = false;
  emit("update:modelValue", "");
  messages.value = {};
};

let canUpdateState = () => {
  return validateMode === "eager" || wasInvalid.value;
};

let updateState = () => {
  // if (props.state !== null) return props.state;
  if (status.value.optional) return "";

  if (!canUpdateState()) return state.value;

  return status.value.valid ? "valid" : "invalid";
};

// watch(
//   () => props.state,
//   (newState) => (state.value = newState),
//   { immediate: true }
// );

let validate = (value) => {
  let { newStatus, newMessages } = getValidateStatus(value);
  status.value = newStatus;
  messages.value = newMessages;
};

let updateValue = (v) => {
  validate(v);

  if (
    validateOn === "blur" &&
    !status.value.touched &&
    !status.value.validated
  ) {
    return;
  }

  if (status.value.valid) {
    wasValid.value = true;
  }
  if (!status.value.valid && wasValid.value) {
    wasInvalid.value = true;
  }

  state.value = updateState();

  emitValidationStatus(status, state, messages);
};

let touch = () => {
  validate(localModel.value);
  status.value.touched = true;

  if (status.value.valid) {
    wasValid.value = true;
  } else {
    wasInvalid.value = true;
  }

  state.value = updateState();

  emitValidationStatus(status, state, messages);
};

let formValidate = () => {
  validate(localModel.value);
  status.value.validated = true;

  if (status.value.valid) {
    wasValid.value = true;
  } else {
    wasInvalid.value = true;
  }

  state.value = updateState();

  emitValidationStatus(status, state, messages);
};

let getValidateStatus = (value) => {
  let newStatus = {
    touched: status.value.touched,
    validated: status.value.validated,
    dirty: status.value.dirty || !!(value && !!value.length),
  };

  let newMessages = {};
  let validationRules = Object.entries(rules);

  newStatus.valid = validationRules.reduce((valid, [key, v]) => {
    let validator =
      globalValidators[key] ||
      (isFunction(rules[key]) && rules[key]);

    if (!validator) return valid;

    let res = validator(value, v);

    if (res === true) {
      newStatus[key] = true;
    } else {
      newStatus[key] = false;
      newMessages[key] = res;
    }

    return valid && newStatus[key];
  }, true);

  newStatus.optional = !rules.required && value === "";

  return { newStatus, newMessages };
};

return {
  status,
  state,
  messages,
  updateValue,
  touch,
  formValidate,
  reset,
}
}
