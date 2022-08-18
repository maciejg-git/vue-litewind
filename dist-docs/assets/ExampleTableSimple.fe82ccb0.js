const r=`<template>\r
  <v-table :items="example.data" class="w-full"></v-table>\r
</template>\r
\r
<script>\r
import { reactive } from "vue";\r
import data from "../data/company-simple.json";\r
\r
export default {\r
  setup() {\r
    let example = reactive({\r
      data: data.slice(0, 5),\r
    });\r
\r
    return {\r
      example,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{r as default};
