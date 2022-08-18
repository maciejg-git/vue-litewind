const n=`<template>\r
  <v-checkbox-group v-model="languages">\r
    <v-checkbox\r
      v-for="l in languagesData"\r
      :value="l"\r
      :id="'language-' + l"\r
      :label="l"\r
      class="my-2"\r
    ></v-checkbox>\r
  </v-checkbox-group>\r
\r
  <div class="mt-5">\r
    <span class="font-semibold">Languages:</span>\r
    {{ languages }}\r
  </div>\r
</template>\r
\r
<script>\r
import { ref } from "vue";\r
\r
export default {\r
  setup() {\r
    let languages = ref([]);\r
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
      languagesData,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{n as default};
