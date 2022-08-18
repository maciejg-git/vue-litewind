const t=`<template>\r
  <v-list width="500px" :tag="example.tag" :base="example.base">\r
    <v-list-item v-for="item in example.users" :active="item.active">\r
      <div class="flex gap-x-4">\r
        <div>\r
          <v-checkbox type="checkbox" v-model="item.active" />\r
        </div>\r
        <div>\r
          <div class="font-semibold">\r
            {{ item.full_name }}\r
          </div>\r
          <div class="text-text-400">\r
            {{ item.title }}\r
          </div>\r
        </div>\r
        <div class="text-sm text-gray-400 ml-auto">\r
          {{ item.department }}\r
        </div>\r
      </div>\r
    </v-list-item>\r
  </v-list>\r
  <!-- CUT START -->\r
  <div class="mt-5">\r
    <label for="style">List style:</label>\r
    <v-select id="style" v-model="example.base">\r
      <option value="list">bootstrap</option>\r
      <option value="list-material">material</option>\r
    </v-select>\r
  </div>\r
  <v-tabs base="material" class="mt-10">\r
    <v-tab name="Props">\r
      <div class="flex flex-col gap-y-2 mt-5">\r
        <div>\r
          <label for="tag">tag:</label>\r
          <v-select id="tag" v-model="example.tag">\r
            <option value="div">div</option>\r
            <option value="a">a</option>\r
            <option value="button">button</option>\r
          </v-select>\r
        </div>\r
      </div>\r
    </v-tab>\r
  </v-tabs>\r
  <!-- CUT END -->\r
</template>\r
\r
<script>\r
import { reactive } from "vue";\r
import company from "../data/company.json";\r
\r
export default {\r
  setup() {\r
    let example = reactive({\r
      users: company.slice(0, 5).map((i) => ({ ...i, active: false })),\r
      tag: "div",\r
      base: "list",\r
    });\r
\r
    return {\r
      example,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{t as default};
