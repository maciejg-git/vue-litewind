import { ref, watch } from "vue";
import { globalValidators } from "../../validators";

let isFunction = (v) => typeof v === "function";

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

  emitValidationStatus(status, state, messages);

  // validate

  watch(
    localModel,
    (value) => {
      onValueUpdated(value);
    },
    { deep: true }
  );

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

    state.value = updateState();

    emitValidationStatus(status, state, messages);
  };

  let touch = () => {
    validate(localModel.value);

    status.value.touched = true;

    state.value = updateState();

    emitValidationStatus(status, state, messages);
  };

  let formValidate = () => {
    validate(localModel.value);

    status.value.validated = true;

    state.value = updateState();

    emitValidationStatus(status, state, messages);
  };

  // update state

  let updateState = () => {
    if (externalState.value !== null) {
      return externalState.value;
    }

    if (status.value.optional) {
      return "";
    }

    if (
      !status.value.dirty &&
      !status.value.touched &&
      !status.value.validated
    ) {
      return state.value;
    }

    if (validateOn === "form" && !status.value.validated) {
      return state.value;
    }

    if (
      validateOn === "blur" &&
      !status.value.touched &&
      !status.value.validated
    ) {
      return state.value;
    }

    if (!status.value.valid) {
      return "invalid";
    }

    if (validateMode === "eager" || state.value !== "") {
      return "valid";
    }

    return state.value;
  };

  watch(
    externalState,
    () => {
      state.value = updateState();
    },
    { immediate: true }
  );

  // reset

  let reset = () => {
    status.value = { ...defaultStatus };
    state.value = "";
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
