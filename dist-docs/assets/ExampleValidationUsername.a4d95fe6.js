const r=`<template>\r
  <div class="flex gap-x-20">\r
    <div class="basis-1/2">\r
      <v-input\r
        v-model="username"\r
        :rules="usernameRules"\r
        type="text"\r
        placeholder="Username"\r
        block\r
        class="w-full"\r
        @update:status="(status) => (usernameStatus = status)"\r
      ></v-input>\r
    </div>\r
    <pre class="m-0">\r
      <code v-html="'model: ' + stringifyObject(username)"></code>\r
      <code v-html="'rules: ' + stringifyObject(usernameRules)"></code>\r
      <code v-html="'status: ' + stringifyObject(usernameStatus, true)"></code>\r
    </pre>\r
  </div>\r
</template>\r
\r
<script>\r
import { ref } from "vue";\r
import { stringifyObject } from "../doc-tools"\r
\r
export default {\r
  setup() {\r
    let username = ref("");\r
    let usernameStatus = ref({});\r
    let usernameRules = {\r
      required: true,\r
      minLength: 5,\r
      alphanumeric: true,\r
    };\r
\r
    return {\r
      username,\r
      usernameStatus,\r
      usernameRules,\r
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
`;export{r as default};
