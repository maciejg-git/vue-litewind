const r=`<template>\r
  <div class="flex gap-x-20">\r
    <div class="basis-1/2">\r
      <v-input\r
        v-model="password"\r
        :rules="passwordRules"\r
        type="text"\r
        placeholder="Password"\r
        block\r
        class="w-full"\r
        @update:status="(status) => (passwordStatus = status)"\r
      ></v-input>\r
    </div>\r
    <pre class="m-0">\r
      <code v-html="'model: ' + stringifyObject(password)"></code>\r
      <code v-html="'rules: ' + stringifyObject(passwordRules)"></code>\r
      <code v-html="'status: ' + stringifyObject(passwordStatus, true)"></code>\r
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
    let password = ref("");\r
    let passwordStatus = ref({});\r
    let passwordRules = {\r
      required: true,\r
      atLeastOneUppercase: true,\r
      atLeastOneLowercase: true,\r
      atLeastOneSpecial: true,\r
      atLeastOneDigit: true,\r
      minLength: 8,\r
    };\r
\r
    return {\r
      password,\r
      passwordStatus,\r
      passwordRules,\r
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
