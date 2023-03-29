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
        @validation:status="(status) => (passwordStatus = status)"
      ></v-input>
    </div>
    <pre class="m-0">
      <code v-html="'model: ' + stringifyObject(password)"></code>
      <code v-html="'rules: ' + stringifyObject(passwordRules)"></code>
      <code v-html="'status: ' + stringifyObject(passwordStatus, true)"></code>
    </pre>
  </div>
  {{ inputs.username.status.value }}
  {{ inputs.username.state.value }}
  <input
    v-model="username"
    type=""
    @blur="inputs.username.touch()"
  />

  <div>
    {{ inputs.company.status.value }}
    {{ inputs.company.state.value }}
    <input
      v-model="company"
      type=""
      @blur="inputs.company.touch()"
    />
  </div>
  <button @click="validate">validate</button>
</template>

<script setup>
import { ref } from "vue";
import { stringifyObject } from "../tools";
import useValidation from "../../components/composition/use-validation";

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
let username = ref("");
let company = ref("");

let { inputs, validate, reset } = useValidation([
  {
    name: "username",
    value: username,
    rules: {
      required: true,
      minLength: 5,
    },
    options: {
      validateOn: "form",
    }
  },
  {
    name: "company",
    value: company,
    rules: {
      required: true,
      maxLength: 5,
    },
    options: {
      validateOn: "form",
    }
  },
]);
</script>

<style scoped lang="postcss">
code {
  @apply block dark:text-text-400 my-2;
}
</style>
