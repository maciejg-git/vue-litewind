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

      emit("update:status", status.value);
      emit("update:modelValue", v);
    };

    let touch = () => {
      status.value.touched = true;
    };

    let formValidate = () => {
      validate(value.value);

      status.value.validated = true;

      if (!status.value.valid) {
        wasInvalid.value = true;
      }

      state.value = updateState();
    };

    let getValidateStatus = (value) => {
      let newStatus = {
        valid: true,
        touched: status.value.touched,
        validated: status.value.validated,
        dirty: status.value.dirty || !!(value && !!value.length),
      };

      let newMessages = {};

      let res = null;

      for (let [key, v] of Object.entries(props.rules)) {
        if (globalValidators[key]) {
          res = globalValidators[key](value, v);
          newStatus[key] = res === true;
          if (res !== true) newMessages[key] = res;
        } else if (typeof props.rules[key] === "function") {
          res = props.rules[key](value);
          newStatus[key] = res === true;
          if (res !== true) newMessages[key] = res;
        }
        newStatus.valid = newStatus.valid && newStatus[key];
      }

      return { newStatus, newMessages };
    };

    if (addInput) addInput({ status, formValidate, reset });

    provide("checkbox-group", { value, updateValue, touch, state });

    emit("update:status", status.value);

    return {};
  },
};
</script>

<style scoped lang="postcss"></style>
