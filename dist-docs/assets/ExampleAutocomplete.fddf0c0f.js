const e=`<template>\r
  <v-autocomplete\r
    v-model="example.model"\r
    v-model:input-value="example.inputValue"\r
    no-filter\r
    inline\r
    :items="example.items"\r
    :is-loading="example.isLoading"\r
    :no-loader="example.noLoader"\r
    :clearable="example.clearable"\r
    :transition="example.transition"\r
    :state="example.state"\r
    style-menu="shadow"\r
    class="w-[420px]"\r
    @input:value="query($event)"\r
    v-on="handleExampleEvents"\r
  ></v-autocomplete>\r
<!-- CUT START -->\r
  <v-tabs base="material" class="mt-10">\r
    <v-tab name="Props">\r
      <div class="flex flex-col gap-y-2 mt-5">\r
        <div>\r
          <label for="model" class="font-semibold">v-model:</label>\r
          <v-input type="text" id="model" inline v-model="example.model"></v-input>\r
        </div>\r
        <div>\r
          <label for="noloader">no-loader:</label>\r
          <v-select-prop id="noloader" v-model="example.noLoader">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="clearable">clearable:</label>\r
          <v-select-prop id="clearable" v-model="example.clearable">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="transition">transition:</label>\r
          <v-select id="transition" v-model="example.transition">\r
            <option value="fade">fade</option>\r
            <option value="">empty string</option>\r
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
import { states } from "../data/data.js";\r
\r
export default {\r
  components: {},\r
  setup() {\r
    let example = reactive({\r
      model: "",\r
      items: [],\r
      isLoading: false,\r
      noLoader: false,\r
      clearable: false,\r
      transition: "fade",\r
    });\r
\r
    let query = (q) => {\r
      if (q === "") return example.items;\r
      example.isLoading = true;\r
      setTimeout(() => {\r
        example.items = states.filter((e) => {\r
          return (\r
            (e.text || "").toLowerCase().indexOf((q || "").toLowerCase()) > -1\r
          );\r
        });\r
        example.isLoading = false;\r
      }, 500);\r
    };\r
\r
    let events = ref([]);\r
\r
    let handleExampleEvents = {\r
      ["update:page"]: (event) =>\r
        events.value.unshift({ ev: "update:page", data: event }),\r
      ["state:focus"]: (event) =>\r
        events.value.unshift({ ev: "state:focus", data: event }),\r
      ["state:opened"]: (event) =>\r
        events.value.unshift({ ev: "state:opened", data: event }),\r
      ["state:closed"]: (event) =>\r
        events.value.unshift({ ev: "state:closed", data: event }),\r
      ["input:value"]: (event) =>\r
        events.value.unshift({ ev: "input:value", data: event }),\r
    };\r
\r
    return {\r
      example,\r
      query,\r
      events,\r
      handleExampleEvents,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{e as default};
