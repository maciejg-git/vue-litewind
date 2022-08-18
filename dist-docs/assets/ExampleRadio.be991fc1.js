const e=`<template>\r
  <div class="flex items-center my-2">\r
    <v-radio\r
      v-model="example.model"\r
      :state="example.state"\r
      value="option"\r
      id="option"\r
    ></v-radio>\r
    <label for="option" class="ml-3">option</label>\r
  </div>\r
\r
  <div class="flex items-center my-2">\r
    <v-radio\r
      v-model="example.model"\r
      :state="example.state"\r
      value="option 2"\r
      id="option2"\r
    ></v-radio>\r
    <label for="option2" class="ml-3">option 2</label>\r
  </div>\r
\r
  <div class="flex items-center my-2">\r
    <v-radio\r
      v-model="example.model"\r
      :state="example.state"\r
      value="option 3"\r
      id="option3"\r
    ></v-radio>\r
    <label for="option3" class="ml-3">option 3</label>\r
  </div>\r
<!-- CUT START -->\r
  <v-tabs base="material" class="mt-10">\r
    <v-tab name="Props">\r
      <div class="flex flex-col gap-y-2 mt-5">\r
        <div>\r
          <label for="model" class="font-semibold">v-model:</label>\r
          <v-input type="text" id="model" inline v-model="example.model"></v-input>\r
        </div>\r
        <div>\r
          <label for="state">state:</label>\r
          <v-select id="state" v-model="example.state">\r
            <option value="">normal (empty string)</option>\r
            <option value="valid">valid</option>\r
            <option value="invalid">invalid</option>\r
          </v-select>\r
        </div>\r
      </div>\r
    </v-tab>\r
    <v-tab>\r
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
      model: "",\r
      state: "",\r
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
