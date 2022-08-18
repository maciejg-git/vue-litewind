const n=`<template>\r
  <v-tabs\r
    v-bind="example"\r
    @input:changed-tab="\r
      events.unshift({ ev: 'input:changed-tab', data: $event })\r
    "\r
  >\r
    <v-tab name="Tab" class="p-4">\r
      {{ text[0] }}\r
    </v-tab>\r
    <v-tab name="Tab 2" class="p-4">\r
      {{ text[1] }}\r
    </v-tab>\r
    <v-tab class="p-4">\r
      <template #name>\r
        <span class="flex justify-between items-center">\r
          Tab 3\r
          <v-badge style-badge="success tiny" class="ml-3">4</v-badge>\r
        </span>\r
      </template>\r
      {{ text[2] }}\r
    </v-tab>\r
    <v-tab v-for="(tab, i) in tabs" :name="tab.name" class="p-4">\r
      <component :is="tab.component" v-bind="tab.props">\r
        {{ tab.content }}\r
      </component>\r
    </v-tab>\r
  </v-tabs>\r
  <!-- CUT START -->\r
  <div class="flex justify-between items-center">\r
    <div class="mt-5">\r
      <label for="style">Tabs style:</label>\r
      <v-select id="style" v-model="example.base">\r
        <option value="default">default</option>\r
        <option value="material">material</option>\r
        <option value="rounded">rounded</option>\r
      </v-select>\r
    </div>\r
    <v-button @click="addTab">Add tab</v-button>\r
  </div>\r
  <v-tabs base="material" class="mt-10">\r
    <v-tab name="Props">\r
      <div class="flex flex-col gap-y-2 mt-5">\r
        <div>\r
          <label for="fill">fill:</label>\r
          <v-select-prop id="fill" v-model="example.fill">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="center">center:</label>\r
          <v-select-prop id="center" v-model="example.center">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="right">right:</label>\r
          <v-select-prop id="right" v-model="example.right">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="transition">transition:</label>\r
          <v-select id="transition" v-model="example.transition">\r
            <option value="fade">fade</option>\r
            <option value="fade-side-slide">fade-side-slide</option>\r
            <option value="fade-top-slide">fade-top-slide</option>\r
            <option value="">empty string (no transition)</option>\r
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
import { text } from "../data/data.js";\r
\r
export default {\r
  setup() {\r
    let example = reactive({\r
      fill: false,\r
      center: false,\r
      right: false,\r
      transition: "fade",\r
      base: "default",\r
    });\r
\r
    let tabs = ref([]);\r
\r
    let addTab = () => {\r
      tabs.value.push({\r
        name: "Tab " + (tabs.value.length + 4),\r
        component: "v-card",\r
        props: {\r
          class: "p-4",\r
        },\r
        content: text[tabs.value.length % 3],\r
      });\r
    };\r
\r
    let events = ref([]);\r
\r
    return {\r
      example,\r
      text,\r
      events,\r
      tabs,\r
      addTab,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{n as default};
