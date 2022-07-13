<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script>
// vue
import { ref, computed, provide } from "vue";
import { globalValidators } from "../validators";

export default {
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: "",
    },
    rules: { type: Object, default: {} },
    messages: { type: Object, default: {} },
    validate: { type: String, default: "on-blur silent" },
  },
  setup(props, { emit }) {
    let defaultStatus = {
      touched: false,
      dirty: false,
      valid: false,
      validated: false,
    };

    let [validateOn, validateMode] = props.validate.split(" ");

    let fieldValue = ref("");
    let status = ref({ ...defaultStatus });
    let messages = ref({});
    let state = ref("");
    let isRequired = props.rules && props.rules.required

    let updateFormFieldValue = (v) => {
      fieldValue.value = v;

      let { newStatus, messages } = getValidateStatus(v);

      status.value = newStatus;
      messages.value = messages;

      if (status.value.touched || validateOn === "eager") {
        if (!status.value.valid) {
          if (validateMode === "silent") {
            if (status.value.wasValid || status.value.wasInvalid) {
              state.value = "invalid";
            }
          }
          if (validateMode === "eager") {
            state.value = "invalid";
          }
        } else {
          if (validateMode === "silent") {
            if (status.value.wasInvalid) {
              state.value = "valid";
            }
          }
          if (validateMode === "eager") {
            state.value = "valid";
          }
        }
      }

      emit("update:status", status.value);
      emit("update:modelValue", v);
    };

    let touch = () => {
      let { newStatus, messages } = getValidateStatus(fieldValue.value, true);
      status.value = newStatus;
      messages.value = messages;

      if (status.value.dirty || props.rules.required) {
        if (!status.value.valid) {
          state.value = "invalid";
        } else {
          if (validateMode === "eager") {
            state.value = "valid";
          }
        }
      }

      emit("update:status", status.value);
    };

    let getValidateStatus = (value, touched) => {
      let newStatus = {
        valid: true,
        isRequired: status.value.isRequired,
        touched: status.value.touched || !!touched,
        // validated: status.value.validated || !!validated,
        dirty: status.value.dirty || !!(value && !!value.length),
      };

      if (props.rules.required) {
        newStatus.required = globalValidators.required(value)
      }

      let messages = {};

      let res = null;

      for (let [key, v] of Object.entries(props.rules)) {
        if (globalValidators[key]) {
          res = globalValidators[key](value, v);
          newStatus[key] = res === true;
          if (res !== true) messages[key] = res;
        } else if (typeof props.rules[key] === "function") {
          res = props.rules[key](value);
          newStatus[key] = res === true;
          if (res !== true) messages[key] = res;
        }
        newStatus.valid = newStatus.valid && newStatus[key];
      }

      newStatus.wasValid = status.value.wasValid || newStatus.valid;

      newStatus.wasInvalid =
        status.value.wasInvalid ||
        (!newStatus.valid && (status.value.wasValid || touched));

      return { newStatus, messages };
    };

    provide("form-field", {
      fieldValue,
      updateFormFieldValue,
      touch,
      status,
      state,
      messages,
    });

    return {};
  },
};
</script>

<style scoped lang="postcss">
.fixed-form-text {
  /* @apply items-center; */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
