<template>
  <div class="flex gap-x-20">
    <div class="basis-1/2 flex flex-col">
      <v-form
        ref="form"
        class="flex flex-col gap-y-32"
        @update:form-status="(status) => (formStatus = status)"
      >
        <v-input
          type="text"
          placeholder="Username"
          block
          class="w-full"
          v-model="username"
          :rules="{
            required: true,
            minLength: 5,
            alphanumeric: true,
          }"
          @update:status="(status) => (usernameStatus = status)"
        ></v-input>

        <v-input
          type="text"
          placeholder="Password"
          block
          class="w-full"
          v-model="password"
          :rules="{
            required: true,
            minLength: 8,
            atLeastOneUppercase: true,
            atLeastOneLowercase: true,
            atLeastOneSpecial: true,
            atLeastOneDigit: true,
          }"
          @update:status="(status) => (passwordStatus = status)"
        ></v-input>

        <v-textarea
          placeholder="Some text"
          v-model="text"
          :rules="{
            required: true,
            maxLength: 30,
          }"
          @update:status="(status) => (textStatus = status)"
        ></v-textarea>
      </v-form>

      <div class="self-end mt-20">
        <v-button style-button="secondary" @click="form.reset()" class="mr-4">
          Reset
        </v-button>
        <v-button @click="form.validate()">Validate</v-button>
      </div>
    </div>
    <pre class="m-0">
      <code v-html="'username: ' + stringifyObject(usernameStatus, true, ['valid', 'validated'])"></code>
      <code v-html="'password: ' + stringifyObject(passwordStatus, true, ['valid', 'validated'])"></code>
      <code v-html="'text: ' + stringifyObject(textStatus, true, ['valid', 'validated'])"></code>
      <code v-html="'form: ' + stringifyObject(formStatus, true)"></code>
    </pre>
  </div>
</template>

<script>
import { ref } from "vue";
import { stringifyObject } from "../doc-tools";

export default {
  components: {},
  setup() {
    let username = ref("");
    let usernameStatus = ref({});

    let password = ref("");
    let passwordStatus = ref({});

    let text = ref("");
    let textStatus = ref({});

    let formStatus = ref({});

    let form = ref(null);

    return {
      username,
      usernameStatus,
      password,
      passwordStatus,
      text,
      textStatus,
      formStatus,
      form,
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
