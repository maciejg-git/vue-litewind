const n=`<template>\r
  <div class="flex gap-x-20">\r
    <div class="basis-1/2 pl-4">\r
      <v-checkbox-group\r
        v-model="languages"\r
        :rules="languagesRules"\r
        @update:status="(status) => (languagesStatus = status)"\r
      >\r
        <div v-for="l in languagesData" class="my-2">\r
          <v-checkbox :value="l" :id="'language-' + l" :label="l"></v-checkbox>\r
          <!-- <label :for="'language-' + l" class="ml-3"> -->\r
          <!--   {{ l }} -->\r
          <!-- </label> -->\r
        </div>\r
      </v-checkbox-group>\r
    </div>\r
    <pre class="m-0">\r
      <code v-html="'model: ' + stringifyObject(languages)"></code>\r
      <code v-html="'rules: ' + stringifyObject(languagesRules)"></code>\r
      <code v-html="'status: ' + stringifyObject(languagesStatus, true)"></code>\r
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
    let languages = ref([]);\r
    let languagesStatus = ref({});\r
    let languagesRules = {\r
      required: true,\r
      minElements: 3,\r
      maxElements: 5,\r
    };\r
\r
    let languagesData = ref([\r
      "english",\r
      "swedish",\r
      "korean",\r
      "german",\r
      "icelandic",\r
      "japanese",\r
    ]);\r
\r
    return {\r
      languages,\r
      languagesStatus,\r
      languagesRules,\r
      languagesData,\r
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
`;export{n as default};
