const r=`<template>\r
\r
  <!-- single mode -->\r
\r
  <div class="flex">\r
    <v-card style="width: 320px" class="p-2">\r
      <v-date-picker v-model="example.single" adjacent-months />\r
    </v-card>\r
    <span class="ml-10">v-model (single): {{ example.single }}</span>\r
  </div>\r
\r
  <!-- range mode -->\r
\r
  <div class="flex">\r
    <v-card style="width: 320px" class="p-2 mt-2">\r
      <v-date-picker v-model="example.range" range adjacent-months />\r
    </v-card>\r
    <span class="ml-10">v-model (range): {{ example.range }}</span>\r
  </div>\r
</template>\r
\r
<script>\r
import { reactive } from "vue";\r
\r
export default {\r
  setup() {\r
    let example = reactive({\r
      single: "",\r
      range: "",\r
    });\r
\r
    return {\r
      example,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{r as default};
