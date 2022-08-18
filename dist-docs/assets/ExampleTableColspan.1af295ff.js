const r=`<template>\r
  <v-table :items="example.data" class="w-full">\r
    <template #colspan="{ item }">\r
      <div class="dark:bg-dark-700 p-2 px-4 m-2">\r
        <div>\r
          <span class="font-semibold">First name:</span> {{ item['first_name'] }}\r
        </div>\r
        <div>\r
          <span class="font-semibold">City:</span> {{ item['city'] }}\r
        </div>\r
      </div>\r
    </template>\r
  </v-table>\r
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
    example.data = example.data.map((i) => {\r
      return { colspan: { ...i }, ...i }\r
    })\r
\r
    return {\r
      example,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{r as default};
