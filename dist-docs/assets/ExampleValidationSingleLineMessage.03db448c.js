const r=`<template>\r
  <v-input\r
    v-model="password"\r
    :rules="passwordRules"\r
    single-line-message\r
    inline\r
    type="text"\r
    placeholder="Password"\r
    class="w-[420px]"\r
  ></v-input>\r
</template>\r
\r
<script>\r
import { ref } from "vue";\r
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
