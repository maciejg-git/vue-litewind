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

export default function useValidation(inputs, globals) {
  let localInputs = Array.isArray(inputs) ? inputs : [inputs];

  let validation = localInputs.reduce((acc, input) => {
    let {
      form = globals?.form || null,
      name = "input",
      value,
      rules = globals?.rules || [],
      options = globals?.options || {},
      externalState = globals?.externalState,
      onUpdate = globals?.onUpdate,
      onReset = globals?.onReset,
    } = input;

    let status = ref({ ...defaultStatus });

    let state = ref("");

    let messages = ref({});

    let opts = {
      validateOn: options.validateOn || "blur",
      validateMode: options.validateMode || "silent",
      stateDefaultValue: options.stateDefaultValue ?? "",
      stateValidValue: options.stateValidValue ?? "valid",
      stateInvalidValue: options.stateInvalidValue ?? "invalid",
    };

    if (!isFunction(onUpdate)) {
      onUpdate = () => {};
    }

    onUpdate(status, state, messages);

    let validate = (value) => {
      let newStatus = {
        touched: status.value.touched,
        validated: status.value.validated,
        dirty: status.value.dirty || !!(value && !!value.length),
      };

      let newMessages = {};

      newStatus.valid = rules.reduce((valid, rule) => {
        let [key, v] =
          typeof rule === "string" ? [rule, null] : Object.entries(rule)[0];

        let validator = globalValidators[key] || (isFunction(v) && v);

        if (!validator) return valid;

        newStatus[key] = false;

        let res = validator(value, v);

        if (res === true) {
          newStatus[key] = true;
        } else {
          newMessages[key] = res;
        }

        return valid && newStatus[key];
      }, true);

      newStatus.optional =
        newMessages.required === undefined &&
        (value === "" || value === false || value.length === 0);

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
      let { dirty, touched, validated, optional, valid } = status.value;

      // external state is set, return it
      if (externalState && externalState.value !== null) {
        return externalState.value;
      }

      // optional input (not required and empty) cannot be valid or invalid,
      // return defalut state
      if (optional) {
        return opts.stateDefaultValue;
      }

      // input has not been yet interacted in any way, return current state
      if (!dirty && !touched && !validated) {
        return state.value;
      }

      // input is validated manually, return current state
      if (opts.validateOn === "form" && !validated) {
        return state.value;
      }

      // input is validated on blur, return current state
      if (opts.validateOn === "blur" && !touched && !validated) {
        return state.value;
      }

      // input is validated immediately, has been touched or validated manually
      // and can change state
      // for invalid inputs always return invalid state
      if (!valid) {
        return opts.stateInvalidValue;
      }

      // for valid inputs return valid only in eager mode or when changing
      // from non default state
      if (
        opts.validateMode === "eager" ||
        state.value !== opts.stateDefaultValue
      ) {
        return opts.stateValidValue;
      }

      // return default state
      return state.value;
    };

    watch(value, onValueUpdated, { deep: true });

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

    return {
      ...acc,
      [name]: {
        form,
        name,
        value,
        status,
        state,
        messages,
        onValueUpdated,
        touch,
        formValidate,
        reset,
      },
    };
  }, {});

  // add inputs to form

  Object.values(validation).forEach((i) => {
    isFunction(i.form?.addToForm) && i.form.addToForm(i);
  });

  // return validation for single input

  let i = Object.keys(validation);

  if (i.length === 1) return validation[i[0]];

  // return validation for multiple inputs

  return validation;
}
