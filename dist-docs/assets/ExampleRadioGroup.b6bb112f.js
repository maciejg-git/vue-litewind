const r=`<template>\r
  <v-radio-group v-model="language">\r
    <v-radio\r
      v-for="l in languagesData"\r
      :value="l"\r
      :id="'language-' + l"\r
      :label="l"\r
      class="my-2"\r
    ></v-radio>\r
  </v-radio-group>\r
\r
  <div class="mt-5">\r
    <span class="font-semibold">Language:</span>\r
    {{ language }}\r
  </div>\r
</template>\r
\r
<script>\r
import { ref } from "vue";\r
\r
export default {\r
  setup() {\r
    let language = ref("");\r
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
      language,\r
      languagesData,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{r as default};
