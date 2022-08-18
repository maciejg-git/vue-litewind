const e=`<template>\r
  <div class="flex gap-x-20">\r
    <div class="basis-1/2">\r
      <v-input\r
        type="text"\r
        placeholder="Username"\r
        block\r
        class="w-full"\r
        v-model="username"\r
        :rules="rules"\r
        validate-on="blur"\r
        validate-mode="silent"\r
        @update:status="(data) => (usernameStatus = data)"\r
      ></v-input>\r
    </div>\r
\r
    <pre class="m-0">\r
      <ul class="font-semibold mb-5">\r
        <li>validate-on: "blur"</li>\r
        <li>validate-mode: "silent""</li>\r
      </ul>\r
      <code v-html="'model: ' + stringifyObject(username)"></code>\r
      <code v-html="'rules: ' + stringifyObject(rules)"></code>\r
      <code v-html="'status: ' + stringifyObject(usernameStatus, true)"></code>\r
    </pre>\r
  </div>\r
\r
  <v-divider class="my-10" />\r
\r
  <div class="flex gap-x-20">\r
    <div class="basis-1/2">\r
      <v-input\r
        type="text"\r
        placeholder="Username"\r
        block\r
        class="w-full"\r
        v-model="username2"\r
        :rules="rules"\r
        validate-on="blur"\r
        validate-mode="eager"\r
        @update:status="(data) => (usernameStatus2 = data)"\r
      ></v-input>\r
    </div>\r
\r
    <pre class="m-0">\r
      <ul class="font-semibold mb-5">\r
        <li>validate-on: "blur"</li>\r
        <li>validate-mode: "eager""</li>\r
      </ul>\r
      <code v-html="'model: ' + stringifyObject(username2)"></code>\r
      <code v-html="'rules: ' + stringifyObject(rules)"></code>\r
      <code v-html="'status: ' + stringifyObject(usernameStatus2, true)"></code>\r
    </pre>\r
  </div>\r
\r
  <v-divider class="my-10" />\r
\r
  <div class="flex gap-x-20">\r
    <div class="basis-1/2">\r
      <v-input\r
        type="text"\r
        placeholder="Username"\r
        block\r
        class="w-full"\r
        v-model="username3"\r
        :rules="rules"\r
        validate-on="immediate"\r
        validate-mode="silent"\r
        @update:status="(data) => (usernameStatus3 = data)"\r
      ></v-input>\r
    </div>\r
\r
    <pre class="m-0">\r
      <ul class="font-semibold mb-5">\r
        <li>validate-on: "immediate"</li>\r
        <li>validate-mode: "silent""</li>\r
      </ul>\r
      <code v-html="'model: ' + stringifyObject(username3)"></code>\r
      <code v-html="'rules: ' + stringifyObject(rules)"></code>\r
      <code v-html="'status: ' + stringifyObject(usernameStatus3, true)"></code>\r
    </pre>\r
  </div>\r
\r
  <v-divider class="my-10" />\r
\r
  <div class="flex gap-x-20">\r
    <div class="basis-1/2">\r
      <v-input\r
        type="text"\r
        placeholder="Username"\r
        block\r
        class="w-full"\r
        v-model="username4"\r
        :rules="rules"\r
        validate-on="immediate"\r
        validate-mode="eager"\r
        @update:status="(data) => (usernameStatus4 = data)"\r
      ></v-input>\r
    </div>\r
\r
    <pre class="m-0">\r
      <ul class="font-semibold text-lg mb-5">\r
        <li>validate-on: "immediate"</li>\r
        <li>validate-mode: "eager""</li>\r
      </ul>\r
      <code v-html="'model: ' + stringifyObject(username4)"></code>\r
      <code v-html="'rules: ' + stringifyObject(rules)"></code>\r
      <code v-html="'status: ' + stringifyObject(usernameStatus4, true)"></code>\r
    </pre>\r
  </div>\r
</template>\r
\r
<script>\r
import { ref } from "vue";\r
import { stringifyObject } from "../doc-tools";\r
\r
export default {\r
  setup() {\r
    let username = ref("");\r
    let username2 = ref("");\r
    let username3 = ref("");\r
    let username4 = ref("");\r
\r
    let rules = {\r
      required: true,\r
      minLength: 5,\r
      alphanumeric: true,\r
    };\r
\r
    let usernameStatus = ref("");\r
    let usernameStatus2 = ref("");\r
    let usernameStatus3 = ref("");\r
    let usernameStatus4 = ref("");\r
\r
    let messages = {\r
      required: "Please enter a value for this field",\r
      alpha: "Please enter only letters",\r
      numeric: "Please enter only numbers",\r
      alphanumeric: "Please enter only letters or numbers",\r
      minLength: "Please enter at least 3 characters",\r
      email: "Please enter valid email address",\r
      atLeastOneUppercase: "Please enter at least one uppercase character",\r
      atLeastOneLowercase: "Please enter at least one lowercase character",\r
      atLeastOneDigit: "Please enter at least one numeric character",\r
      atLeastOneSpecial: "Please enter at least one special character",\r
    };\r
\r
    return {\r
      username,\r
      username2,\r
      username3,\r
      username4,\r
      rules,\r
      usernameStatus,\r
      usernameStatus2,\r
      usernameStatus3,\r
      usernameStatus4,\r
      messages,\r
      stringifyObject,\r
    };\r
  },\r
};\r
<\/script>\r
\r
<style scoped lang="postcss">\r
code {\r
  @apply block dark:text-text-400 my-2;\r
}\r
</style>\r
`;export{e as default};
