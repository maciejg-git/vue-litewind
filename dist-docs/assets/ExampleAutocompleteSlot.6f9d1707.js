const e=`<template>\r
  <v-autocomplete\r
    v-model="example.model"\r
    v-model:input-value="example.inputValue"\r
    :items="example.items"\r
    :is-loading="example.isLoading"\r
    item-text="full_name"\r
    item-value="id"\r
    inline\r
    style-menu="shadow"\r
    no-filter\r
    @input:value="query($event)"\r
    class="w-[420px]"\r
  >\r
    <template #item="{ item, inputValue, highlight }">\r
      <div class="flex justify-between">\r
        <div v-html="highlight(item['full_name'], inputValue)"></div>\r
        <div class="text-xs">{{ item.department }}</div>\r
      </div>\r
      <span class="text-sm font-semibold text-text-400 dark:text-text-400">\r
        {{ item.title }}\r
      </span>\r
    </template>\r
  </v-autocomplete>\r
</template>\r
\r
<script>\r
import { reactive } from "vue";\r
import company from "../data/company.json";\r
\r
export default {\r
  setup() {\r
    let example = reactive({\r
      model: "",\r
      items: [],\r
      isLoading: false,\r
    });\r
\r
    let query = (q) => {\r
      if (q === "") return;\r
      example.isLoading = true;\r
      setTimeout(() => {\r
        example.items = company.filter((e) => {\r
          return (\r
            (e["full_name"] || "")\r
              .toLowerCase()\r
              .indexOf((q || "").toLowerCase()) > -1\r
          );\r
        });\r
        example.isLoading = false;\r
      }, 500);\r
    };\r
\r
    return {\r
      example,\r
      query,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{e as default};
