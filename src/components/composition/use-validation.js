import { ref, watch } from "vue";
import { globalValidators } from "../../validators";
import { isFunction } from "../../tools";

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: false,
  validated: false,
};

export default function useValidation(
  rules,
  validateOn,
  validateMode,
  localModel,
  externalState,
  emitValidationStatus
) {
  let status = ref({ ...defaultStatus });
  let state = ref("");
  let messages = ref({});
  let wasValid = ref(false);
  let wasInvalid = ref(false);

  emitValidationStatus(status, state, messages);

  // validate

  watch(localModel, (value) => onValueUpdated(value));

  let validate = (value) => {
    let newStatus = {
      touched: status.value.touched,
      validated: status.value.validated,
      dirty: status.value.dirty || !!(value && !!value.length),
    };

    let newMessages = {};
    let validationRules = Object.entries(rules);

    newStatus.valid = validationRules.reduce((valid, [key, v]) => {
      let validator =
        globalValidators[key] || (isFunction(rules[key]) && rules[key]);

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

    status.value = newStatus;
    messages.value = newMessages;
  };

  let onValueUpdated = (value) => {
    validate(value);

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

  // update state

  watch(
    externalState,
    (newState) => {
      state.value = newState;
    },
    { immediate: true }
  );

  let canUpdateState = () => {
    return validateMode === "eager" || wasInvalid.value;
  };

  let updateState = () => {
    if (externalState.value !== null) {
      return externalState.value;
    }
    if (status.value.optional) {
      return "";
    }
    if (!canUpdateState()) {
      return state.value;
    }

    return status.value.valid ? "valid" : "invalid";
  };

  // reset

  let reset = () => {
    status.value = { ...defaultStatus };
    state.value = "";
    wasInvalid.value = false;
    wasValid.value = false;
    emit("update:modelValue", "");
    messages.value = {};
  };

  return {
    status,
    state,
    messages,
    onValueUpdated,
    touch,
    formValidate,
    reset,
  };
}
