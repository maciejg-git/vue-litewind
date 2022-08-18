const e=`<template>\r
  <p class="my-6">Input with icon (prop and slot)</p>\r
\r
  <div class="flex gap-x-10">\r
    <!-- icon (prop) -->\r
\r
    <v-input\r
      v-model="example.model"\r
      v-bind="example"\r
      icon="b-exclamation-circle"\r
      placeholder="Type something..."\r
      @click:clear-button="handleClickClear"\r
    ></v-input>\r
\r
    <!-- icon (slot) -->\r
\r
    <v-input\r
      v-model="example.model"\r
      v-bind="example"\r
      icon="b-exclamation-circle"\r
      placeholder="Type something..."\r
      @click:clear-button="handleClickClear"\r
    >\r
      <template #icon>\r
        <v-icon\r
          name="b-exclamation-circle"\r
          class="h-6 w-6 text-gray-400 dark:text-gray-400 mr-2"\r
        ></v-icon>\r
      </template>\r
    </v-input>\r
  </div>\r
\r
  <p class="my-6 mt-12">Prepend and append slots</p>\r
\r
  <div class="flex gap-x-10">\r
\r
    <v-input\r
      v-model="example.model"\r
      v-bind="example"\r
      placeholder="Type something..."\r
      @click:clear-button="handleClickClear"\r
    >\r
      <template #prepend>\r
        <div class="mr-2">http://</div>\r
      </template>\r
    </v-input>\r
\r
    <v-input\r
      v-model="example.model"\r
      v-bind="example"\r
      placeholder="Type something..."\r
      @click:clear-button="handleClickClear"\r
    >\r
      <template #append>\r
        <div class="ml-2">.com</div>\r
      </template>\r
    </v-input>\r
  </div>\r
\r
  <p class="my-6 mt-12">Alternative style input</p>\r
\r
  <!-- underlined -->\r
\r
  <div class="flex gap-x-10">\r
    <v-input\r
      v-model="example.model"\r
      v-bind="example"\r
      base="underlined"\r
      placeholder="Type something..."\r
      @click:clear-button="handleClickClear"\r
    ></v-input>\r
\r
    <!-- rounded -->\r
\r
    <v-input\r
      v-model="example.model"\r
      v-bind="example"\r
      base="round"\r
      placeholder="Type something..."\r
      @click:clear-button="handleClickClear"\r
    ></v-input>\r
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
          <label for="type">type:</label>\r
          <v-select id="type" v-model="example.type">\r
            <option value="text">text</option>\r
            <option value="password">password</option>\r
            <option value="email">email</option>\r
            <option value="number">number</option>\r
            <option value="search">search</option>\r
            <option value="time">time</option>\r
            <option value="url">url</option>\r
            <option value="color">color</option>\r
            <option value="date">date</option>\r
          </v-select>\r
        </div>\r
        <div>\r
          <label for="label">label:</label>\r
          <v-input type="text" id="label" inline v-model="example.label"></v-input>\r
        </div>\r
        <div>\r
          <label for="clearable">clearable:</label>\r
          <v-select-prop id="clearable" v-model="example.clearable">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="use-loader">use-loader:</label>\r
          <v-select-prop id="use-loader" v-model="example.useLoader">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="is-loading">is-loading:</label>\r
          <v-select-prop id="is-loading" v-model="example.isLoading">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="state">state:</label>\r
          <v-select id="state" v-model="example.state">\r
            <option :value=null>component controlled (null)</option>\r
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
        <v-badge\r
          style-badge="secondary tiny"\r
          class="ml-2"\r
          update-animation="scale-up"\r
          :update-key="events.length"\r
        >\r
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
      type: "text",\r
      label: "",\r
      clearable: false,\r
      useLoader: false,\r
      isLoading: false,\r
      state: "",\r
    });\r
\r
    let events = ref([]);\r
\r
    let handleClickClear = (ev) => {\r
      example.model = ""\r
      events.value.unshift({ ev: "click:clear-button", data: ev });\r
    };\r
\r
    return {\r
      example,\r
      events,\r
      handleClickClear,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{e as default};
