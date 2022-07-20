<template>
  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-input
        type="text"
        placeholder="Username"
        block
        class="w-full"
        v-model="username"
        :rules="rules"
        @update:status="(data) => (usernameStatus = data)"
      ></v-input>
    </div>

    <pre class="m-0">
      <span class="font-bold">
      Mode: "on-blur silent"
      </span>
      <code v-html="'model: ' + stringifyObject(username)"></code>
      <code v-html="'rules: ' + stringifyObject(rules)"></code>
      <code v-html="'status: ' + stringifyObject(usernameStatus, true)"></code>
    </pre>
  </div>

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-input
        type="text"
        placeholder="Username"
        block
        class="w-full"
        v-model="username2"
        :rules="rules"
        validate="on-blur eager"
        @update:status="(data) => (usernameStatus2 = data)"
      ></v-input>
    </div>

    <pre class="m-0">
      <span class="font-bold">
      Mode: "on-blur eager"
      </span>
      <code v-html="'model: ' + stringifyObject(username2)"></code>
      <code v-html="'rules: ' + stringifyObject(rules)"></code>
      <code v-html="'status: ' + stringifyObject(usernameStatus2, true)"></code>
    </pre>
  </div>

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-input
        type="text"
        placeholder="Username"
        block
        class="w-full"
        v-model="username3"
        :rules="rules"
        validate="immediate silent"
        @update:status="(data) => (usernameStatus3 = data)"
      ></v-input>
    </div>

    <pre class="m-0">
      <span class="font-bold">
        Mode: "immediate silent"
      </span>
      <code v-html="'model: ' + stringifyObject(username3)"></code>
      <code v-html="'rules: ' + stringifyObject(rules)"></code>
      <code v-html="'status: ' + stringifyObject(usernameStatus3, true)"></code>
    </pre>
  </div>

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-input
        type="text"
        placeholder="Username"
        block
        class="w-full"
        v-model="username4"
        :rules="rules"
        validate="immediate eager"
        @update:status="(data) => (usernameStatus4 = data)"
      ></v-input>
    </div>

    <pre class="m-0">
      <span class="font-bold">
      Mode: "immediate eager"
      </span>
      <code v-html="'model: ' + stringifyObject(username4)"></code>
      <code v-html="'rules: ' + stringifyObject(rules)"></code>
      <code v-html="'status: ' + stringifyObject(usernameStatus4, true)"></code>
    </pre>
  </div>
</template>

<script>
import { ref } from "vue";
import { stringifyObject } from "../doc-tools";

export default {
  setup() {
    let username = ref("");
    let username2 = ref("");
    let username3 = ref("");
    let username4 = ref("");

    let rules = {
      required: true,
      minLength: 5,
      alphanumeric: true,
    };

    let usernameStatus = ref("");
    let usernameStatus2 = ref("");
    let usernameStatus3 = ref("");
    let usernameStatus4 = ref("");

    let messages = {
      required: "Please enter a value for this field",
      alpha: "Please enter only letters",
      numeric: "Please enter only numbers",
      alphanumeric: "Please enter only letters or numbers",
      minLength: "Please enter at least 3 characters",
      email: "Please enter valid email address",
      atLeastOneUppercase: "Please enter at least one uppercase character",
      atLeastOneLowercase: "Please enter at least one lowercase character",
      atLeastOneDigit: "Please enter at least one numeric character",
      atLeastOneSpecial: "Please enter at least one special character",
    };

    return {
      username,
      username2,
      username3,
      username4,
      rules,
      usernameStatus,
      usernameStatus2,
      usernameStatus3,
      usernameStatus4,
      messages,
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
