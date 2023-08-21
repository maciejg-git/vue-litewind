<template>
  <div class="flex gap-x-20">
    <div class="flex basis-1/2 flex-col">
      <v-form
        ref="form"
        class="flex flex-col"
      >
        <div>
          <v-input
            v-model="inputs.username"
            type="text"
            label="Username"
            :rules="usernameRules"
            block
            class="w-full"
            @validation:status="(res) => (status.username = res)"
          ></v-input>
        </div>

        <div class="mt-20">
          <v-input
            v-model="inputs.password"
            type="text"
            label="Password"
            :rules="passwordRules"
            block
            class="w-full"
            @validation:status="(res) => (status.password = res)"
          ></v-input>
        </div>

        <div class="mt-32">
          <v-textarea
            v-model="inputs.text"
            :rules="textRules"
            placeholder="Some text"
            rows="3"
            @validation:status="(res) => (status.text = res)"
          ></v-textarea>
        </div>

        <div class="mt-10">
          <v-checkbox
            v-model="inputs.checkbox"
            :rules="checkboxRules"
            label="Check this"
          />
        </div>
      </v-form>

      <div class="mt-20 self-end">
        <v-button
          mod-button="variant:secondary"
          @click="form.reset()"
          class="mr-4"
        >
          Reset
        </v-button>
        <v-button @click="validate()">Validate</v-button>
      </div>
    </div>

    <!-- validation results -->

    <pre class="m-0">
      <code v-html="'username: ' + stringifyObject(status.username, true, ['valid', 'validated'])"></code>
      <code v-html="'password: ' + stringifyObject(status.password, true, ['valid', 'validated'])"></code>
      <code v-html="'text: ' + stringifyObject(status.text, true, ['valid', 'validated'])"></code>
      <code v-html="'form validate(): ' + stringifyObject(status.form, true)"></code>
    </pre>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { stringifyObject } from "../tools";

let inputs = reactive({
  username: "",
  password: "",
  text: "",
  checkbox: false,
});

let usernameRules = [
  "required",
  { minLength: 5 },
  "alphanumeric"
];

let passwordRules = [
  "required",
  { minLength: 8 },
  "atLeastOneUppercase",
  "atLeastOneLowercase",
  "atLeastOneSpecial",
  "atLeastOneDigit",
];

let textRules = [
  "required",
  { maxLength: 30 }
];

let checkboxRules = ["required"];

let form = ref(null);

let validate = () => {
  status.form = form.value.validate();
};

let status = reactive({
  username: {},
  password: {},
  text: {},
  checkbox: {},
  form: false,
});
</script>

<style scoped lang="postcss">
code {
  @apply my-2 block dark:text-text-400;
}
</style>
