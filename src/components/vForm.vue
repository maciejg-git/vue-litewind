<template>
  <form>
    <slot name="default"></slot>
  </form>
</template>

<script>
// vue
import { ref, provide } from "vue";

export default {
  props: {},
  setup(props, { emit, expose }) {
    let defaultStatus = {
      valid: false,
    };

    let inputs = [];

    let status = ref({ ...defaultStatus });

    let addInput = (input) => {
      inputs.push(input);
    };

    let validate = () => {
      inputs.forEach((i) => i.formValidate());

      status.value.valid = inputs.every((i) => i.status.value.valid);

      emit("update:form-status", status.value);
    };

    provide("form", {
      addInput,
      validate,
    });

    emit("update:form-status", status.value);

    expose({ validate });

    return {};
  },
};
</script>

<style scoped lang="postcss"></style>
