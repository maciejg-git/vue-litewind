<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script>
// vue
import { ref, provide } from "vue";
import { globalValidators } from "../validators";

export default {
  props: {
    modelValue: {
      type: [String, Boolean],
      default: undefined,
    },
    rules: { type: Object, default: {} },
  },
  setup(props, { emit }) {
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

    let updateFieldState = () => {
      if (!status.value.valid) {
        if (status.value.wasValid || status.value.wasInvalid) {
          state.value = "invalid";
        }
      } else {
        if (status.value.wasInvalid) {
          state.value = "valid";
        }
      }
    };

    let updateValue = (v) => {
      value.value = v;

      let { newStatus, newMessages } = getValidateStatus(v);

      status.value = newStatus;
      messages.value = newMessages;

      updateFieldState();

      emit("update:status", status.value);
      emit("update:modelValue", v);
    };

    let touch = () => {
      status.value.touched = true
    }

    let getValidateStatus = (value, touched) => {
      let newStatus = {
        valid: true,
        touched: status.value.touched || !!touched,
        // validated: status.value.validated || !!validated,
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

      newStatus.wasValid = status.value.wasValid || newStatus.valid;

      newStatus.wasInvalid =
        status.value.wasInvalid || (!newStatus.valid && status.value.wasValid);

      return { newStatus, newMessages };
    };

    provide("radio-group", {
      value,
      updateValue,
      touch,
      state,
    });

    emit("update:status", status.value);

    return {};
  },
};
</script>

<style scoped lang="postcss">
</style>
