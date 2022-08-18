const e=`<template>\r
  <v-button @click="isOpen = !isOpen">Toggle sidepanel</v-button>\r
\r
  <v-sidepanel\r
    v-model="isOpen"\r
    v-bind="example"\r
  >\r
    <template #header>\r
      <span class="text-xl font-bold">Sidepanel</span>\r
    </template>\r
    <div class="p-5">\r
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.\r
      Lorem Ipsum has been the industry's standard dummy text ever since the\r
      1500s, when an unknown printer took a galley of type and scrambled it to\r
      make a type specimen book. It has survived not only five centuries, but\r
      also the leap into electronic typesetting, remaining essentially\r
      unchanged. It was popularised in the 1960s with the release of Letraset\r
      sheets containing Lorem Ipsum passages, and more recently with desktop\r
      publishing software like Aldus PageMaker including versions of Lorem\r
      Ipsum.\r
    </div>\r
  </v-sidepanel>\r
<!-- CUT START -->\r
  <v-tabs base="material" class="mt-10">\r
    <v-tab name="Props">\r
      <div class="mb-2 mt-5">\r
        <label for="model" class="font-semibold">v-model:</label>\r
        <v-input type="text" id="model" inline v-model="isOpen"></v-input>\r
      </div>\r
      <div class="mb-2">\r
        <label for="close-button">close-button:</label>\r
        <v-select-prop id="close-button" v-model="example.closeButton">\r
          <option :value="true">true</option>\r
          <option :value="false">false</option>\r
        </v-select-prop>\r
      </div>\r
      <div class="mb-2">\r
        <label for="sidebar-left">sidebar-left:</label>\r
        <v-select-prop id="sidebar-left" v-model="example.sidebarLeft">\r
          <option :value="true">true</option>\r
          <option :value="false">false</option>\r
        </v-select-prop>\r
      </div>\r
      <div class="mb-2">\r
        <label for="width">width:</label>\r
        <v-input type="text" id="width" inline v-model="example.width"></v-input>\r
      </div>\r
      <div class="mb-2">\r
        <label for="no-header">no-header:</label>\r
        <v-select-prop id="no-header" v-model="example.noHeader">\r
          <option :value="true">true</option>\r
          <option :value="false">false</option>\r
        </v-select-prop>\r
      </div>\r
      <div class="mb-2">\r
        <label for="transition">transition:</label>\r
        <v-select id="transition" v-model="example.transition">\r
          <option value="fade-slide-f">fade-slide-f</option>\r
          <option value="fade-slide-m">fade-slide-m</option>\r
          <option value="fade-slide-s">fade-slide-s</option>\r
          <option value="">empty string</option>\r
        </v-select>\r
      </div>\r
    </v-tab>\r
  </v-tabs>\r
<!-- CUT END -->\r
</template>\r
\r
<script>\r
import { ref, reactive } from "vue";\r
\r
export default {\r
  setup() {\r
    let example = reactive({\r
      closeButton: true,\r
      sidebarLeft: false,\r
      width: "320px",\r
      noHeader: false,\r
      transition: "fade-slide-m",\r
    });\r
\r
    let isOpen = ref(false);\r
\r
    return {\r
      example,\r
      isOpen,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{e as default};
