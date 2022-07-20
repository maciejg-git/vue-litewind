<template>
  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-input
        v-model="username"
        :rules="usernameRules"
        type="text"
        placeholder="Username"
        block
        class="w-full"
        @update:status="(status) => (usernameStatus = status)"
      ></v-input>
    </div>
    <pre class="m-0">
      <code v-html="'model: ' + stringifyObject(username)"></code>
      <code v-html="'rules: ' + stringifyObject(usernameRules)"></code>
      <code v-html="'status: ' + stringifyObject(usernameStatus, true)"></code>
    </pre>
  </div>

  <v-divider class="my-10" />

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

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div class="basis-1/2 pl-4">
      <v-checkbox-group
        v-model="languages"
        :rules="languagesRules"
        @update:status="(status) => (languagesStatus = status)"
      >
        <div v-for="l in languagesData" class="flex items-center my-2">
          <v-checkbox :value="l" :id="'language-' + l"></v-checkbox>
          <label :for="'language-' + l" class="ml-3">
            {{ l }}
          </label>
        </div>
      </v-checkbox-group>
    </div>

    <pre class="m-0">
      <code v-html="'model: ' + stringifyObject(languages)"></code>
      <code v-html="'rules: ' + stringifyObject(languagesRules)"></code>
      <code v-html="'status: ' + stringifyObject(languagesStatus, true)"></code>
    </pre>
  </div>

  <v-divider class="my-10" />
</template>

<script>
import { ref } from "vue";
import { stringifyObject } from "../doc-tools"

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
      wasNotUsed: (v) => v !== 'l@stP@ssword' || "Password cannot be same as previous",
    };

    let languages = ref([]);
    let languagesStatus = ref({});
    let languagesRules = {
      required: true,
      minElements: 3,
      maxElements: 5,
    };

    let options = ref([
      {
        value: "option",
        label: "option",
      },
      {
        value: "option 2",
        label: "option 2",
      },
      {
        value: "option 3",
        label: "option 3",
      },
    ]);

    let languagesData = ref([
      "english",
      "swedish",
      "korean",
      "german",
      "icelandic",
      "japanese",
    ]);

    return {
      username,
      usernameStatus,
      usernameRules,
      password,
      passwordStatus,
      passwordRules,
      languages,
      languagesStatus,
      languagesRules,
      languagesData,
      options,
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
