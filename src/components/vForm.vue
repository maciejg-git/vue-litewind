<template>
  <form>
    <slot name="default"></slot>
  </form>
</template>

<script>
// vue
import { ref, provide } from "vue";

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
      valid: false,
    };

    let status = ref({ ...defaultStatus });

    let validate = () => {

    }

    provide("form-field", {
      groupValue,
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
