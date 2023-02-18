<template>
  <form>
    <slot name="default"></slot>
  </form>
</template>

<script setup>
import { ref, provide, nextTick } from "vue";

let inputs = [];

let valid = ref(false);

let addFormInput = (input) => {
  inputs.push(input);
};

let validate = () => {
  inputs.forEach((i) => i.formValidate());

  valid.value = inputs.every((i) => {
    return i.status.value.valid || i.status.value.optional;
  });

  return valid.value;
};

let reset = () => {
  inputs.forEach((i) => i.reset());
  valid.value = false;
};

provide("form", { addFormInput });

defineExpose({ validate, reset });
</script>

<style scoped lang="postcss"></style>
