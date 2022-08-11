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
    let inputs = [];

    let valid = ref(false);

    let addInput = (input) => {
      inputs.push(input);
    };

    let validate = () => {
      inputs.forEach((i) => i.formValidate());

      valid.value = inputs.every((i) => i.status.value.valid);

      return valid.value
    };

    let reset = () => {
      inputs.forEach((i) => i.reset())
      valid.value = false
    }

    provide("form", { addInput });

    expose({ validate, reset });

    return {};
  },
};
</script>

<style scoped lang="postcss"></style>
