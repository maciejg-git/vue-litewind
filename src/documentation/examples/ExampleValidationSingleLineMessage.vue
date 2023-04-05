<template>
  <v-input
    v-model="password"
    :rules="passwordRules"
    single-line-message
    inline
    type="text"
    placeholder="Password"
    class="w-[420px]"
  ></v-input>
</template>

<script setup>
import { ref } from "vue";

let password = ref("");
let passwordStatus = ref({});
let passwordRules = [
  "required",
  "atLeastOneUppercase",
  "atLeastOneLowercase",
  "atLeastOneSpecial",
  "atLeastOneDigit",
  { minLength: 8 },
];
</script>

<style scoped lang="postcss">
code {
  @apply block dark:text-text-400 my-2;
}
</style>
