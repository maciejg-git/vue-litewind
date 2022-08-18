const e=`<template>\r
  <!-- simple popover -->\r
\r
  <p class="my-4">Simple popover</p>\r
\r
  <v-popover v-bind="example">\r
    <template #reference="{ reference, onTrigger }">\r
      <v-button :ref="reference" v-on="onTrigger">Show simple popover</v-button>\r
    </template>\r
    This is popover.\r
  </v-popover>\r
\r
  <!-- form popover -->\r
\r
  <p class="my-4">Form popover</p>\r
\r
  <v-popover v-bind="example" title="Login">\r
    <template #reference="{ reference, onTrigger }">\r
      <v-button :ref="reference" v-on="onTrigger">Show form popover</v-button>\r
    </template>\r
    <div class="flex flex-col gap-y-4 w-[250px]">\r
      <div class="flex flex-col gap-y-1">\r
        <v-input type="text" label="Email" id="login" placeholder="Enter email"></v-input>\r
      </div>\r
      <div class="flex flex-col gap-y-1">\r
        <v-input type="password" label="Password" id="password" placeholder="Enter password"></v-input>\r
      </div>\r
      <v-button style-button="small" class="ml-auto mt-2">Login</v-button>\r
    </div>\r
  </v-popover>\r
\r
  <!-- tooltip popover -->\r
\r
  <p class="my-4">Tooltip popover</p>\r
\r
  <v-popover v-bind="example" title="Header" base="plain">\r
    <template #reference="{ reference, onTrigger }">\r
      <v-button :ref="reference" v-on="onTrigger">\r
        Show tooltip popover\r
      </v-button>\r
    </template>\r
    <div class="w-[280px]">\r
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.\r
      Lorem Ipsum has been the industry's standard dummy text ever since the\r
      1500s, when an unknown printer took a galley of type and scrambled it to\r
      make a type specimen book. It has survived not only five centuries, but also\r
      the leap into electronic typesetting, remaining essentially unchanged. It\r
      was popularised in the 1960s with the release of Letraset sheets containing\r
      Lorem Ipsum passages, and more recently with desktop publishing software\r
      like Aldus PageMaker including versions of Lorem Ipsum.\r
    </div>\r
  </v-popover>\r
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
            <option value="focus">focus</option>\r
            <option value="hover">hover</option>\r
          </v-select>\r
        </div>\r
        <div>\r
          <label for="no-header">no-header:</label>\r
          <v-select-prop id="no-header" v-model="example.noHeader">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="title">title</label>\r
          <v-input type="text" id="title" inline v-model="example.title"></v-input>\r
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
      placement: "right",\r
      trigger: "click",\r
      noHeader: false,\r
      title: "Popover title",\r
      transition: "fade-m",\r
      offsetY: 10,\r
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
