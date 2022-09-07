<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script>
// vue
import { ref, provide, inject } from "vue";
// validators
import { globalValidators } from "../validators";

export default {
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array],
      default: undefined,
    },
    rules: { type: Object, default: {} },
  },
  setup(props, { emit }) {
    let { addInput } = inject("form", {});

    let defaultStatus = {
      touched: false,
      dirty: false,
      valid: false,
      validated: false,
    };

    let value = ref(props.modelValue);
    let status = ref({ ...defaultStatus });
    let messages = ref({});
    let state = ref("");
    let wasValid = ref(false);
    let wasInvalid = ref(false);

    let reset = () => {
      status.value = { ...defaultStatus };
      state.value = "";
      wasInvalid.value = false;
      wasValid.value = false;
      value.value = [];
      messages.value = {};
    };

    let updateState = () => {
      if (!status.value.valid) {
        if (wasValid.value || wasInvalid.value) {
          return "invalid";
        }
      } else {
        if (wasInvalid.value) {
          return "valid";
        }
      }
      return state.value;
    };

    let validate = (value) => {
      let { newStatus, newMessages } = getValidateStatus(value);
      status.value = newStatus;
      messages.value = newMessages;
    };

    let updateValue = (v) => {
      value.value = v;

      validate(v);

      if (status.value.valid) {
        wasValid.value = true;
      }
      if (!status.value.valid && wasValid.value) {
        wasInvalid.value = true;
      }

      state.value = updateState();

      emitValidationStatus();

      emit("update:modelValue", v)
    };

    let touch = () => {
      status.value.touched = true;
    };

    let formValidate = () => {
      validate(value.value);

      status.value.validated = true;

      if (status.value.valid) {
        wasValid.value = true;
      } else {
        wasInvalid.value = true;
      }

      state.value = updateState();

      emitValidationStatus();
    };

    let getValidateStatus = (value) => {
      let newStatus = {
        touched: status.value.touched,
        validated: status.value.validated,
        dirty: status.value.dirty || !!(value && !!value.length),
      };

      let newMessages = {};
      let rules = Object.entries(props.rules);

      newStatus.valid = rules.reduce((valid, [key, v]) => {
        let validator =
          globalValidators[key] ||
          (isFunction(props.rules[key]) && props.rules[key]);

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

      newStatus.optional = !props.rules.required && value === "";

      return { newStatus, newMessages };
    };

    let emitValidationStatus = () => {
      emit("update:status", status.value);
      emit("update:state", state.value);
      emit("update:messages", messages.value);
    };

    if (addInput) addInput({ status, formValidate, reset });

    provide("checkbox-group", { value, updateValue, touch, state });

    emit("update:status", status.value);

    return {};
  },
};
</script>

<style scoped lang="postcss"></style>
