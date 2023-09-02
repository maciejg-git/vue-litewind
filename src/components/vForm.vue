<template>
  <form>
    <!-- @slot default -->
    <slot name="default"></slot>
  </form>
</template>

<script setup>
import { provide } from "vue";
import useFormValidation from "./composition/use-form-validation";

let form = useFormValidation();

provide("_form", form);

defineExpose({ validate: form.validate, reset: form.reset });
</script>
