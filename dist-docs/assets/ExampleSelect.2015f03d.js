const n=`<template>\r
  <!-- single value select -->\r
\r
  <p class="my-6">Simple select</p>\r
\r
  <v-select\r
    v-model="example.model"\r
    :state="example.state"\r
    :options="options"\r
    class="w-52"\r
  >\r
    <template #options-prepend>\r
      <option value="option (prepend slot)">option (prepend slot)</option>\r
    </template>\r
    <option value="option (default slot)">option (default slot)</option>\r
  </v-select>\r
\r
  <!-- multiple value select -->\r
\r
  <p class="my-6">Multiple options select</p>\r
\r
  <v-select\r
    v-model="example.modelMultiple"\r
    :state="example.state"\r
    :options="options"\r
    :multiple="true"\r
    class="w-52"\r
  ></v-select>\r
\r
  <p class="my-6">Select with icon</p>\r
\r
  <div class="flex gap-x-10">\r
\r
    <!-- icon (prop) -->\r
\r
    <v-select\r
      v-model="example.model"\r
      :state="example.state"\r
      :options="options"\r
      icon="b-exclamation-circle"\r
      class="w-52"\r
    ></v-select>\r
\r
    <!-- icon (slot) -->\r
\r
    <v-select\r
      v-model="example.model"\r
      :state="example.state"\r
      :options="options"\r
      icon="b-exclamation-circle"\r
      class="w-52"\r
    >\r
      <template #icon>\r
        <v-icon\r
          name="b-exclamation-circle"\r
          class="absolute h-6 w-6 text-gray-400 dark:text-gray-400 ml-2 mr-2"\r
        ></v-icon>\r
      </template>\r
    </v-select>\r
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
          <label for="model-multiple" class="font-semibold">\r
            v-model (multiple):\r
          </label>\r
          <v-input\r
            type="text"\r
            id="model-multiple"\r
            inline\r
            v-model="example.modelMultiple"\r
          ></v-input>\r
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
      modelMultiple: [],\r
      state: "",\r
    });\r
\r
    let events = ref([]);\r
\r
    let options = ref([\r
      {\r
        value: "option",\r
        label: "option",\r
      },\r
      {\r
        value: "option 2",\r
        label: "option 2",\r
      },\r
      {\r
        value: "option 3",\r
        label: "option 3",\r
      },\r
    ]);\r
\r
    return {\r
      example,\r
      options,\r
      events,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{n as default};
