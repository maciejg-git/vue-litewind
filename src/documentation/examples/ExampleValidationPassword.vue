<template>
  <div class="flex flex-col md:flex-row md:gap-x-20">
    <div class="basis-1/2">
      <v-input
        v-model="password"
        :rules="passwordRules"
        type="text"
        placeholder="Password"
        block
        class="w-full"
        @validation:status="(status) => (passwordStatus = status)"
      ></v-input>
    </div>
    <pre class="m-0 mt-[100px] md:mt-0">
      <code v-html="'model: ' + stringifyObject(password)"></code>
      <code v-html="'rules: ' + stringifyObject(passwordRules)"></code>
      <code v-html="'status: ' + stringifyObject(passwordStatus, true)"></code>
    </pre>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { stringifyObject } from "../tools";

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
