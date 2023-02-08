<template>
  <div class="flex gap-x-20">
    <div class="basis-1/2 flex flex-col">
      <v-form
        ref="form"
        class="flex flex-col gap-y-32"
      >
        <div>
          <v-input
            v-model="username"
            type="text"
            label="Username"
            :rules="usernameRules"
            block
            class="w-full"
            @update:status="(status) => (usernameStatus = status)"
          ></v-input>
        </div>

        <div>
          <v-input
            v-model="password"
            type="text"
            label="Password"
            :rules="passwordRules"
            block
            class="w-full"
            @update:status="(status) => (passwordStatus = status)"
          ></v-input>
        </div>

        <div>
          <v-textarea
            v-model="text"
            :rules="textRules"
            placeholder="Some text"
            rows="3"
            @update:status="(status) => (textStatus = status)"
          ></v-textarea>
        </div>
      </v-form>

      <div class="self-end mt-20">
        <v-button style-button="secondary" @click="form.reset()" class="mr-4">
          Reset
        </v-button>
        <v-button @click="validate()">Validate</v-button>
      </div>
    </div>
    <pre class="m-0">
      <code v-html="'username: ' + stringifyObject(usernameStatus, true, ['valid', 'validated'])"></code>
      <code v-html="'password: ' + stringifyObject(passwordStatus, true, ['valid', 'validated'])"></code>
      <code v-html="'text: ' + stringifyObject(textStatus, true, ['valid', 'validated'])"></code>
      <code v-html="'form validate(): ' + stringifyObject(formStatus, true)"></code>
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
    let usernameRules = {
      required: true,
      minLength: 5,
      alphanumeric: true,
    };

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

    let text = ref("");
    let textStatus = ref({});
    let textRules = {
      required: true,
      maxLength: 30,
    };

    let formStatus = ref(false);

    let form = ref(null);

    let validate = () => {
      formStatus.value = form.value.validate()
    }

    return {
      username,
      usernameStatus,
      usernameRules,
      password,
      passwordStatus,
      passwordRules,
      text,
      textStatus,
      textRules,
      formStatus,
      form,
      validate,
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
