const e=`<template>\r
  <v-autocomplete\r
    v-model="example.model"\r
    :items="example.items"\r
    icon="b-exclamation-circle"\r
    inline\r
    style-menu="shadow"\r
    class="w-[420px]"\r
  ></v-autocomplete>\r
</template>\r
\r
<script>\r
import { reactive } from "vue";\r
import { languages } from "../data/data.js";\r
\r
export default {\r
  setup() {\r
    let example = reactive({\r
      model: "",\r
      items: languages,\r
    });\r
\r
    return {\r
      example,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{e as default};
