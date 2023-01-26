import { ref, watch } from "vue";
import { globalValidators } from "../../validators";

let isFunction = (v) => typeof v === "function";

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: false,
  optional: false,
  validated: false,
};

export default function useValidation(
  rules,
  localModel,
  externalState,
  onUpdateState,
  onReset,
  opts
) {
  let status = ref({ ...defaultStatus });

  let state = ref("");

  let messages = ref({});

  let options = {
    validateOn: opts.validateOn || "blur",
    validateMode: opts.validateMode || "silent",
  }

  if (!isFunction(onUpdateState)) {
    onUpdateState = () => {}
  }

  onUpdateState(status, state, messages);

  // validate

  watch(
    localModel,
    (value) => {
      onValueUpdated(value)
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

    onUpdateState(status, state, messages);
  };

  let touch = () => {
    validate(localModel.value);

    status.value.touched = true;

    state.value = updateState();

    onUpdateState(status, state, messages);
  };

  let formValidate = () => {
    validate(localModel.value);

    status.value.validated = true;

    state.value = updateState();

    onUpdateState(status, state, messages);
  };

  let updateState = () => {
    if (externalState && externalState.value !== null) {
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

    if (options.validateOn === "form" && !status.value.validated) {
      return state.value;
    }

    if (
      options.validateOn === "blur" &&
      !status.value.touched &&
      !status.value.validated
    ) {
      return state.value;
    }

    if (!status.value.valid) {
      return "invalid";
    }

    if (options.validateMode === "eager" || state.value !== "") {
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
    messages.value = {};
    isFunction(onReset) && onReset()
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
