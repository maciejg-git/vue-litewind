const n=`<template>\r
\r
  <!-- Dropdown menu -->\r
\r
  <v-dropdown\r
    v-bind="example"\r
    @state:opened="events.unshift({ ev: 'state:opened', data: $event })"\r
    @state:closed="events.unshift({ ev: 'state:closed', data: $event })"\r
  >\r
    <template #reference="{ reference, onTrigger }">\r
      <v-button-dropdown :ref="reference" v-on="onTrigger" class="mr-4">\r
        Dropdown menu\r
      </v-button-dropdown>\r
    </template>\r
    <v-card width="320px" style-card="menu shadow">\r
      <v-dropdown-menu-item tag="button">\r
        Menu item\r
      </v-dropdown-menu-item>\r
      <v-dropdown-menu-item tag="button">\r
        Second menu item\r
      </v-dropdown-menu-item>\r
      <v-dropdown-header>\r
        Menu header\r
      </v-dropdown-header>\r
      <v-dropdown-menu-item active tag="button">\r
        Active menu item\r
      </v-dropdown-menu-item>\r
      <v-dropdown-menu-item tag="button">\r
        Another menu item\r
      </v-dropdown-menu-item>\r
      <v-divider />\r
      <v-dropdown-menu-item disabled tag="button">\r
        Disabled menu item\r
      </v-dropdown-menu-item>\r
      <v-dropdown-menu-item tag="button">Menu item</v-dropdown-menu-item>\r
    </v-card>\r
  </v-dropdown>\r
\r
  <!-- Dropdown menu (alternate style) -->\r
\r
  <v-dropdown\r
    v-bind="example"\r
    base="relaxed"\r
    @state:opened="events.unshift({ ev: 'state:opened', data: $event })"\r
    @state:closed="events.unshift({ ev: 'state:closed', data: $event })"\r
  >\r
    <template #reference="{ reference, onTrigger }">\r
      <v-button :ref="reference" v-on="onTrigger" class="mr-4">\r
        Dropdown menu (alternate style)\r
        <v-chevron style-chevron="right" />\r
      </v-button>\r
    </template>\r
    <v-card width="320px" style-card="shadow" class="flex flex-col py-1 ">\r
      <v-dropdown-menu-item tag="button">\r
        Menu item\r
      </v-dropdown-menu-item>\r
      <v-dropdown-menu-item tag="button">\r
        Second menu item\r
      </v-dropdown-menu-item>\r
      <v-dropdown-header>\r
        Menu header\r
      </v-dropdown-header>\r
      <v-dropdown-menu-item active tag="button">\r
        Active menu item\r
      </v-dropdown-menu-item>\r
      <v-dropdown-menu-item tag="button">\r
        Another menu item\r
      </v-dropdown-menu-item>\r
      <v-divider class="w-11/12 mx-auto" />\r
      <v-dropdown-menu-item disabled tag="button">\r
        Disabled menu item\r
      </v-dropdown-menu-item>\r
      <v-dropdown-menu-item tag="button">Menu item</v-dropdown-menu-item>\r
    </v-card>\r
  </v-dropdown>\r
<!-- CUT START -->\r
  <v-tabs base="material" class="mt-10">\r
    <v-tab name="Props">\r
      <div class="flex flex-col gap-y-2 mt-5">\r
        <div>\r
          <label for="placement">placement:</label>\r
          <v-select id="placement" v-model="example.placement">\r
            <option value="auto">auto</option>\r
            <option value="auto-start">auto-start</option>\r
            <option value="auto-end">auto-end</option>\r
            <option value="top">top</option>\r
            <option value="top-start">top-start</option>\r
            <option value="top-end">top-end</option>\r
            <option value="bottom">bottom</option>\r
            <option value="bottom-start">bottom-start</option>\r
            <option value="bottom-end">bottom-end</option>\r
            <option value="right">right</option>\r
            <option value="right-start">right-start</option>\r
            <option value="right-end">right-end</option>\r
            <option value="left">left</option>\r
            <option value="left-start">left-start</option>\r
            <option value="left-end">left-end</option>\r
          </v-select>\r
        </div>\r
        <div>\r
          <label for="trigger">trigger:</label>\r
          <v-select id="trigger" v-model="example.trigger">\r
            <option value="click">click</option>\r
            <option value="hover">hover</option>\r
            <option value="focus">focus</option>\r
          </v-select>\r
        </div>\r
        <div>\r
          <label for="offsetX">offsetX:</label>\r
          <v-input type="text" id="offsetX" inline v-model.number="example.offsetX"></v-input>\r
        </div>\r
        <div>\r
          <label for="offsetY">offsetY:</label>\r
          <v-input type="text" id="offsetY" inline v-model.number="example.offsetY"></v-input>\r
        </div>\r
        <div>\r
          <label for="no-flip">no-flip:</label>\r
          <v-select-prop id="no-flip" v-model="example.noFlip">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="auto-close-menu">auto-close-menu:</label>\r
          <v-select-prop id="auto-close-menu" v-model="example.autoCloseMenu">\r
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
            <option value="">empty string</option>\r
          </v-select>\r
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
      placement: "bottom-start",\r
      offsetX: 0,\r
      offsetY: 5,\r
      noFlip: false,\r
      autoCloseMenu: false,\r
      transition: "fade-m",\r
      trigger: "click",\r
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
`;export{n as default};
