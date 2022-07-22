<template>
  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-input
        v-model="password"
        :rules="passwordRules"
        type="text"
        placeholder="Password"
        block
        class="w-full"
        @update:status="(status) => (passwordStatus = status)"
      ></v-input>
    </div>
    <pre class="m-0">
      <code v-html="'model: ' + stringifyObject(password)"></code>
      <code v-html="'rules: ' + stringifyObject(passwordRules)"></code>
      <code v-html="'status: ' + stringifyObject(passwordStatus, true)"></code>
    </pre>
  </div>
</template>

<script>
import { ref } from "vue";
import { stringifyObject } from "../doc-tools"

export default {
  setup() {
    let password = ref("");
    let passwordStatus = ref({});
    let passwordRules = {
      required: true,
      minLength: 8,
      atLeastOneUppercase: true,
      atLeastOneLowercase: true,
      atLeastOneSpecial: true,
      atLeastOneDigit: true,
    };
    return {
      password,
      passwordStatus,
      passwordRules,
      stringifyObject,
    };
  },
};
</script>

<style scoped lang="postcss">
code {
  @apply block dark:text-text-400 my-2;
}
</style>
