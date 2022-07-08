<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script>
// vue
import { ref, computed, provide } from "vue";
import { globalValidators } from "../validators";
import { isString } from "../tools";

export default {
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: "",
    },
    rules: { type: Object, default: {} },
    messages: { type: Object, default: {} },
  },
  setup(props, { emit }) {
    let defaultStatus = {
      touched: false,
      dirty: false,
      valid: false,
      validated: false,
    };

    let value = ref(null);
    let status = ref({ ...defaultStatus });

    let updateFormFieldValue = (v) => {
      value.value = v;
      status.value = getValidateStatus(v)
      emit("update:status", status.value)
      emit("update:modelValue", v)
    };

    provide("update-value", updateFormFieldValue)

    let messages = computed(() => {
      if (props.state === "invalid") return props.messages;
      // let status = props.status;
      // if (!(status.value.dirty && status.value.touched)) return {};
      //
      // return Object.fromEntries(
      //   Object.entries(props.messages).reduce((pm, m) => {
      //     if (status.value[m[0]] === false) {
      //       pm.push(m);
      //       return pm;
      //     }
      //     return pm;
      //   }, [])
      // );
    });

    let getValidateStatus = (value) => {
      let newStatus = {
        valid: true,
        isRequired: status.value.isRequired,
        // touched: status.value.touched || !!touched,
        // validated: status.value.validated || !!validated,
        dirty:
          status.value.dirty || !!(value && !!value.length),
      };

      let messages = {};

      let res = null;

      for (let [key, value] of Object.entries(props.rules)) {
        if (globalValidators[key]) {
          res = globalValidators[key](value, value);
          newStatus[key] = res === true;
          if (res !== true) messages[key] = res;
        } else if (typeof validators[key] === "function") {
          res = validators[key](value);
          newStatus[key] = res === true;
          if (res !== true) messages[key] = res;
        }
        newStatus.valid = newStatus.valid && newStatus[key];
      }

      // newStatus.wasValid = status.value.wasValid || newStatus.valid;

      // newStatus.wasInvalid =
      //   status.value.wasInvalid ||
      //   (!newStatus.valid && (status.value.wasValid || touched || validated));

      return { newStatus, messages };
    };

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
