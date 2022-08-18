const n=`<template>\r
  <!-- model collapse -->\r
\r
  <p class="mt-8 mb-4">Model collapse</p>\r
\r
  <v-card>\r
    <v-button-collapse v-model="example.isVisible" block class="w-full">\r
      Toggle collapse\r
    </v-button-collapse>\r
    <v-collapse v-model="example.isVisible" :transition="example.transition">\r
      <div class="p-8">\r
        {{ text[0] }}\r
      </div>\r
    </v-collapse>\r
  </v-card>\r
\r
  <!-- reference slot collapse -->\r
\r
  <p class="mt-8 mb-4">Reference slot collapse</p>\r
\r
  <v-card>\r
    <v-collapse :transition="example.transition">\r
      <template #reference="{ isOpen, onTrigger }">\r
        <v-button-collapse\r
          :switch="isOpen"\r
          block\r
          class="w-full"\r
          v-on="onTrigger"\r
        >\r
          Toggle collapse\r
        </v-button-collapse>\r
      </template>\r
      <div class="p-8">\r
        {{ text[0] }}\r
      </div>\r
    </v-collapse>\r
  </v-card>\r
\r
  <!-- custom button collapse -->\r
\r
  <p class="mt-8 mb-4">Custom button collapse</p>\r
\r
  <v-card>\r
    <v-collapse :transition="example.transition">\r
      <template #reference="{ isOpen, onTrigger }">\r
        <v-button block class="w-full" v-on="onTrigger">\r
          <span class="ml-auto">Toggle collapse</span>\r
          <v-chevron\r
            initial="down"\r
            rotate180\r
            counter-clockwise\r
            triangle\r
            :switch="isOpen"\r
            class="ml-auto"\r
          />\r
        </v-button>\r
      </template>\r
      <div class="p-8">\r
        {{ text[1] }}\r
      </div>\r
    </v-collapse>\r
  </v-card>\r
  <!-- CUT START -->\r
  <v-tabs base="material" class="mt-10">\r
    <v-tab name="Props">\r
      <div class="flex flex-col gap-y-2 mt-5">\r
        <div>\r
          <label for="transition">transition:</label>\r
          <v-select id="transition" v-model="example.transition">\r
            <option value="fade-collapse-f">fade-collapse-f</option>\r
            <option value="fade-collapse-m">fade-collapse-m</option>\r
            <option value="fade-collapse-s">fade-collapse-s</option>\r
            <option value="">none (empty string)</option>\r
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
import { text } from "../data/data.js";\r
\r
export default {\r
  setup() {\r
    let example = reactive({\r
      isVisible: false,\r
      transition: "fade-collapse-m",\r
    });\r
\r
    return {\r
      example,\r
      text,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{n as default};
