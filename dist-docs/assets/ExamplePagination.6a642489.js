const e=`<template>\r
  <v-pagination\r
    v-model="example.page"\r
    :items-count="example.itemsCount"\r
    :items-per-page="example.itemsPerPage"\r
    :max-pages="example.maxPages"\r
  />\r
<!-- CUT START -->\r
  <v-tabs base="material" class="mt-10">\r
    <v-tab name="Props">\r
      <div class="flex flex-col gap-y-2 mt-5">\r
        <div>\r
          <label for="model" class="font-semibold">v-model:</label>\r
          <v-input type="text" id="model" inline v-model="example.page"></v-input>\r
        </div>\r
        <div>\r
          <label for="items-count">items-count:</label>\r
          <v-input\r
            type="text"\r
            id="items-count"\r
            inline\r
            v-model.number="example.itemsCount"\r
          ></v-input>\r
        </div>\r
        <div>\r
          <label for="items-per-page">items-per-page:</label>\r
          <v-input\r
            type="text"\r
            id="items-per-page"\r
            inline\r
            v-model.number="example.itemsPerPage"\r
          ></v-input>\r
        </div>\r
        <div>\r
          <label for="max-pages">max-pages:</label>\r
          <v-input\r
            type="text"\r
            id="max-pages"\r
            inline\r
            v-model.number="example.maxPages"\r
          ></v-input>\r
        </div>\r
      </div>\r
    </v-tab>\r
    <v-tab name="Events">\r
      <template #name>\r
        Events\r
        <v-badge style-badge="secondary tiny" class="ml-2">\r
          {{ events.length }}\r
        </v-badge>\r
      </template>\r
      <event-viewer :events="events" />\r
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
      page: 1,\r
      itemsPerPage: 5,\r
      itemsCount: 50,\r
      maxPages: 7,\r
    });\r
\r
    let events = ref([]);\r
\r
    return {\r
      example,\r
      events,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{e as default};
