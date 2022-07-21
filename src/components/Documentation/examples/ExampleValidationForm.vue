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
          @update:status="(data) => (usernameStatus = data)"
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
          @update:status="(data) => (usernameStatus = data)"
        ></v-input>

        <v-input
          type="text"
          placeholder="Email"
          block
          class="w-full"
          v-model="email"
          :rules="{
            required: true,
            email: true,
          }"
          @update:status="(data) => (usernameStatus = data)"
        ></v-input>
      </v-form>

      <v-button @click="form.validate()" class="self-end mt-20">
        Validate
      </v-button>
    </div>
    <pre class="m-0">
      <code v-html="'form status: ' + stringifyObject(formStatus, true)"></code>
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

    let email = ref("");
    let emailStatus = ref({});

    let password = ref("");
    let passwordStatus = ref({});

    let formStatus = ref({});

    let form = ref(null);

    return {
      username,
      usernameStatus,
      email,
      emailStatus,
      password,
      passwordStatus,
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
