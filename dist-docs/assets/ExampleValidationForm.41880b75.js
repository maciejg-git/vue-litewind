const r=`<template>\r
  <div class="flex gap-x-20">\r
    <div class="basis-1/2 flex flex-col">\r
      <v-form\r
        ref="form"\r
        class="flex flex-col gap-y-32"\r
      >\r
        <v-input\r
          v-model="username"\r
          type="text"\r
          label="Username"\r
          :rules="usernameRules"\r
          block\r
          class="w-full"\r
          @update:status="(status) => (usernameStatus = status)"\r
        ></v-input>\r
\r
        <v-input\r
          v-model="password"\r
          type="text"\r
          label="Password"\r
          :rules="passwordRules"\r
          block\r
          class="w-full"\r
          @update:status="(status) => (passwordStatus = status)"\r
        ></v-input>\r
\r
        <v-textarea\r
          v-model="text"\r
          :rules="textRules"\r
          placeholder="Some text"\r
          rows="3"\r
          @update:status="(status) => (textStatus = status)"\r
        ></v-textarea>\r
      </v-form>\r
\r
      <div class="self-end mt-20">\r
        <v-button style-button="secondary" @click="form.reset()" class="mr-4">\r
          Reset\r
        </v-button>\r
        <v-button @click="validate()">Validate</v-button>\r
      </div>\r
    </div>\r
    <pre class="m-0">\r
      <code v-html="'username: ' + stringifyObject(usernameStatus, true, ['valid', 'validated'])"></code>\r
      <code v-html="'password: ' + stringifyObject(passwordStatus, true, ['valid', 'validated'])"></code>\r
      <code v-html="'text: ' + stringifyObject(textStatus, true, ['valid', 'validated'])"></code>\r
      <code v-html="'form: ' + stringifyObject(formStatus, true)"></code>\r
    </pre>\r
  </div>\r
</template>\r
\r
<script>\r
import { ref } from "vue";\r
import { stringifyObject } from "../doc-tools";\r
\r
export default {\r
  components: {},\r
  setup() {\r
    let username = ref("");\r
    let usernameStatus = ref({});\r
    let usernameRules = {\r
      required: true,\r
      minLength: 5,\r
      alphanumeric: true,\r
    };\r
\r
    let password = ref("");\r
    let passwordStatus = ref({});\r
    let passwordRules = {\r
      required: true,\r
      minLength: 8,\r
      atLeastOneUppercase: true,\r
      atLeastOneLowercase: true,\r
      atLeastOneSpecial: true,\r
      atLeastOneDigit: true,\r
    };\r
\r
    let text = ref("");\r
    let textStatus = ref({});\r
    let textRules = {\r
      required: true,\r
      maxLength: 30,\r
    };\r
\r
    let formStatus = ref(false);\r
\r
    let form = ref(null);\r
\r
    let validate = () => {\r
      formStatus.value = form.value.validate()\r
    }\r
\r
    return {\r
      username,\r
      usernameStatus,\r
      usernameRules,\r
      password,\r
      passwordStatus,\r
      passwordRules,\r
      text,\r
      textStatus,\r
      textRules,\r
      formStatus,\r
      form,\r
      validate,\r
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
