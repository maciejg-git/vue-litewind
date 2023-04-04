<template>
  <div class="flex flex-col md:flex-row md:gap-x-20">
    <div class="basis-1/2">
      <v-input
        v-model="username"
        :rules="usernameRules"
        type="text"
        placeholder="Username"
        block
        class="w-full"
        @validation:status="(status) => (usernameStatus = status)"
      ></v-input>
    </div>
    <pre class="m-0 mt-[100px] md:mt-0">
      <code v-html="'model: ' + stringifyObject(username)"></code>
      <code v-html="'rules: ' + stringifyObject(usernameRules)"></code>
      <code v-html="'status: ' + stringifyObject(usernameStatus, true)"></code>
    </pre>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { stringifyObject } from "../tools";

let username = ref("");
let usernameStatus = ref({});
let usernameRules = {
  required: true,
  minLength: 5,
  alphanumeric: true,
};
</script>

<style scoped lang="postcss">
code {
  @apply block dark:text-text-400 my-2;
}
</style>
