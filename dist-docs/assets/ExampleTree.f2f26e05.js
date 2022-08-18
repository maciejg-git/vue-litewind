const e=`<template>\r
  <v-tree\r
    v-bind="example"\r
    ref="treeRef"\r
    :chevron="{ triangle: true }"\r
    :placeholder-folder-icon="['mdi-folder', 'mdi-folder-open']"\r
    placeholder-item-icon="b-file-earmark"\r
    @input:click="handleClickItem"\r
    @input:selected="handleSelectedItem"\r
  >\r
    <template #item-append="{ item }">\r
      <v-badge v-if="item.badge" style-badge="tiny" class="ml-2">\r
        {{ item.badge }}\r
      </v-badge>\r
    </template>\r
  </v-tree>\r
\r
  <v-button style-button="small" class="mr-4 mt-8" @click="treeRef.openAllLevel(9999)" >\r
    Open all\r
  </v-button>\r
  <v-button style-button="small" @click="treeRef.closeAll()">Close all</v-button>\r
<!-- CUT START -->\r
  <v-tabs base="material" class="mt-10">\r
    <v-tab name="Props">\r
      <div class="flex flex-col gap-y-2 mt-5">\r
        <div>\r
          <label for="filter">filter:</label>\r
          <v-input\r
            type="text"\r
            id="filter"\r
            inline\r
            v-model="example.filter"\r
            clearable\r
          ></v-input>\r
        </div>\r
        <div>\r
          <label for="open-on-click">open-on-click:</label>\r
          <v-select-prop id="open-on-click" v-model="example.openOnClick">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="show-indicators">show-indicators:</label>\r
          <v-select-prop id="show-indicators" v-model="example.showIndicators">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="show-icons">show-icons:</label>\r
          <v-select-prop id="show-icons" v-model="example.showIcons">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="show-checkboxes">show-checkboxes:</label>\r
          <v-select-prop id="show-checkboxes" v-model="example.showCheckboxes">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="select-return-keys">select-return-keys:</label>\r
          <v-select-prop\r
            id="select-return-keys"\r
            v-model="example.selectReturnKeys"\r
          >\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="select-independent">select-independent:</label>\r
          <v-select-prop\r
            id="select-independent"\r
            v-model="example.selectIndependent"\r
          >\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="allow-select-disabled">allow-select-disabled:</label>\r
          <v-select-prop\r
            id="allow-select-disabled"\r
            v-model="example.allowSelectDisabled"\r
          >\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="allow-open-disabled">allow-open-disabled:</label>\r
          <v-select-prop\r
            id="allow-open-disabled"\r
            v-model="example.allowOpenDisabled"\r
          >\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="transition">transition:</label>\r
          <v-select id="transition" v-model="example.transition">\r
            <option value="fade-f">fade-f</option>\r
            <option value="fade-m">fade-m</option>\r
            <option value="fade-s">fade-s</option>\r
            <option value="fade-slide-f">fade-slide-f</option>\r
            <option value="fade-slide-m">fade-slide-m</option>\r
            <option value="fade-slide-s">fade-slide-s</option>\r
            <option value="">empty string</option>\r
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
    const treeData = [\r
      {\r
        name: "Directory",\r
        id: 17,\r
        children: [\r
          { name: "Some item", id: 1 },\r
          { name: "Another item", id: 2 },\r
          { name: "Third item", id: 3 },\r
          { name: "File", icon: "b-star", id: 4 },\r
          {\r
            name: "Sub directory",\r
            id: 5,\r
            children: [\r
              {\r
                name: "Another sub directory",\r
                id: 6,\r
                children: [\r
                  { name: "Content", id: 7 },\r
                  { name: "Another item", id: 8 },\r
                ],\r
              },\r
              { name: "Fourth item", id: 9 },\r
              { name: "Another file", id: 10 },\r
              { name: "Video file", id: 11 },\r
              { name: "Secret item", id: 12 },\r
              {\r
                name: "More content here",\r
                id: 13,\r
                children: [\r
                  { name: "Another video file", id: 14, badge: "NEW" },\r
                  { name: "Fifth item", id: 15 },\r
                ],\r
              },\r
            ],\r
          },\r
          { name: "Sixth item", id: 16 },\r
        ],\r
      },\r
      {\r
        name: "Another directory",\r
        id: 17,\r
        children: [\r
          {\r
            name: "Sub dir",\r
            id: 5,\r
            children: [\r
              { name: "New file", id: 9 },\r
              { name: "Music file", id: 10 },\r
              { name: "Secret content", id: 12 },\r
              {\r
                name: "Folder",\r
                id: 13,\r
                children: [\r
                  { name: "Another file", id: 14, badge: "NEW" },\r
                  { name: "Readme", id: 15 },\r
                ],\r
              },\r
            ],\r
          },\r
          { name: "More content", id: 1 },\r
          { name: "Movie file", id: 16 },\r
        ],\r
      },\r
      ]\r
\r
    let example = reactive({\r
      items: treeData,\r
      openOnClick: true,\r
      showIndicators: true,\r
      showIcons: true,\r
      showCheckboxes: false,\r
      filter: "",\r
      openAll: false,\r
      autoOpenRoot: false,\r
      autoOpenAll: false,\r
      selectReturnKeys: false,\r
      selectIndependent: false,\r
      allowSelectDisabled: false,\r
      allowOpenDisabled: true,\r
      transition: "fade-m",\r
    });\r
\r
    let treeRef = ref(null);\r
\r
    let selectedItems = ref([]);\r
\r
    let events = ref([]);\r
\r
    let handleClickItem = (item) => {\r
      events.value.unshift({ ev: "input:click", data: item });\r
    };\r
\r
    let handleSelectedItem = (selection) => {\r
      events.value.unshift({ ev: "input:selected", data: selection });\r
    };\r
\r
    return {\r
      example,\r
      selectedItems,\r
      treeRef,\r
      events,\r
      handleClickItem,\r
      handleSelectedItem,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{e as default};
