<template>
  <v-input
    v-model="password"
    :rules="passwordRules"
    inline
    type="text"
    placeholder="Password"
    class="w-[420px]"
    :form-text="{ class: 'relative' }"
  >
    <template #message="{ message }">
      <span
        class="inline-block font-semibold rounded bg-secondary-100 dark:bg-dark-700 p-1 my-1"
      >
        {{ message }}
      </span>
    </template>
  </v-input>
</template>

<script setup>
import { ref } from "vue";

let password = ref("");
let passwordStatus = ref({});
let passwordRules = {
  required: true,
  atLeastOneUppercase: true,
  atLeastOneLowercase: true,
  atLeastOneSpecial: true,
  atLeastOneDigit: true,
  minLength: 8,
};
</script>

<style scoped lang="postcss">
code {
  @apply block dark:text-text-400 my-2;
}
</style>
