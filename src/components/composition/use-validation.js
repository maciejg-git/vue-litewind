import { ref, watch, unref } from "vue";
import { globalValidators } from "../../validators";

let isFunction = (v) => typeof v === "function";

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: false,
  optional: false,
  validated: false,
};

export default function useValidation(inputs) {
  inputs = Array.isArray(inputs) ? inputs : [inputs];

  let validationInputs = {}

  inputs.forEach((input) => {
    let {
      name = "input",
      value,
      rules,
      options,
      externalState,
      onUpdate,
      onReset,
    } = input;

    let status = ref({ ...defaultStatus });

    let state = ref("");

    let messages = ref({});

    let opts = {
      validateOn: options?.validateOn || "blur",
      validateMode: options?.validateMode || "silent",
    };

    if (!isFunction(onUpdate)) {
      onUpdate = () => {};
    }

    onUpdate(status, state, messages);

    watch(
      value,
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

      newStatus.valid = Object.entries(rules).reduce((valid, [key, v]) => {
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

      newStatus.optional = !rules.required && (value === "" || value === false);

      status.value = newStatus;
      messages.value = newMessages;
    };

    let onValueUpdated = (value) => {
      validate(value);

      state.value = updateState();

      onUpdate(status, state, messages);
    };

    let touch = () => {
      validate(unref(value));

      status.value.touched = true;

      state.value = updateState();

      onUpdate(status, state, messages);
    };

    let formValidate = () => {
      validate(unref(value));

      status.value.validated = true;

      state.value = updateState();

      onUpdate(status, state, messages);
    };

    let updateState = () => {
      // external state is set, return it
      if (externalState && externalState.value !== null) {
        return externalState.value;
      }

      // optional input (not required and empty) cannot be valid or invalid,
      // return defalut state
      if (status.value.optional) {
        return "";
      }

      // input has not been yet interacted in any way, return current state
      if (
        !status.value.dirty &&
        !status.value.touched &&
        !status.value.validated
      ) {
        return state.value;
      }

      // input is validated manually, return current state
      if (opts.validateOn === "form" && !status.value.validated) {
        return state.value;
      }

      // input is validated on blur, return current state
      if (
        opts.validateOn === "blur" &&
        !status.value.touched &&
        !status.value.validated
      ) {
        return state.value;
      }

      // input is validated immediately, has been touched or validated manually
      // and can change state
      // for invalid inputs always return invalid state
      if (!status.value.valid) {
        return "invalid";
      }

      // for valid inputs return valid only in eager mode or when changing
      // from non default state
      if (opts.validateMode === "eager" || state.value !== "") {
        return "valid";
      }

      // return default state
      return state.value;
    };

    if (externalState !== undefined) {
      watch(
        externalState,
        () => {
          state.value = updateState();
        },
        { immediate: true }
      );
    }

    // reset

    let reset = () => {
      status.value = { ...defaultStatus };
      state.value = "";
      messages.value = {};
      isFunction(onReset) && onReset();
      onUpdate(status, state, messages);
    };

    validationInputs[name] = {
      status,
      state,
      messages,
      onValueUpdated,
      touch,
      formValidate,
      reset,
    };
  });

  let i = Object.keys(validationInputs);

  if (i.length === 1) {
    return validationInputs[i[0]]
  }

  let validate = function() {
    Object.values(this.inputs).forEach((i) => {
      i.formValidate()
    })

    return Object.values(this.inputs).every((i) => {
      return i.status.value.valid || i.status.value.optional
    })
  }

  let reset = function() {
    this.inputs.forEach((i) => {
      i.reset()
    })
  }

  return {
    inputs: validationInputs,
    validate,
    reset,
  }
}
