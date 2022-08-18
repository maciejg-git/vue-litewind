const e=`<template>\r
  <!-- Simple alert -->\r
\r
  <p class="my-6">Simple alert</p>\r
\r
  <v-alert\r
    v-model="example.isVisible"\r
    :dismissable="example.dismissable"\r
    :auto-dismiss-delay="example.autoDismissDelay"\r
    :icon="example.variant"\r
    :variant="example.variant"\r
    style-alert="info:info danger:danger warn:warn success:success invalid:danger valid:success"\r
  >\r
    Alert\r
  </v-alert>\r
\r
  <!-- alert with custom icon -->\r
\r
  <p class="my-6">Custom icon alert</p>\r
\r
  <v-alert\r
    v-model="example.isVisible"\r
    :dismissable="example.dismissable"\r
    :auto-dismiss-delay="example.autoDismissDelay"\r
    :variant="example.variant"\r
    style-alert="info:info danger:danger warn:warn success:success invalid:danger valid:success"\r
  >\r
    <template #icon>\r
      <v-icon :icon-type="example.variant" class="w-6 h-6 mr-2"></v-icon>\r
    </template>\r
    Alert\r
  </v-alert>\r
\r
  <!-- styled alert -->\r
\r
  <p class="my-6">Styled alert</p>\r
\r
  <v-alert\r
    v-model="example.isVisible"\r
    :dismissable="example.dismissable"\r
    :auto-dismiss-delay="example.autoDismissDelay"\r
    :icon="example.variant"\r
    :variant="example.variant"\r
    style-alert="borderless shadowed outline info:info danger:danger warn:warn success:success invalid:danger valid:success"\r
  >\r
    Alert\r
  </v-alert>\r
<!-- CUT START -->\r
  <div class="flex justify-between mt-5">\r
    <div>\r
      <label for="variant">Alert variant:</label>\r
      <v-select id="variant" v-model="example.variant">\r
        <option value="info">info</option>\r
        <option value="danger">danger</option>\r
        <option value="warn">warn</option>\r
        <option value="success">success</option>\r
        <option value="valid">valid</option>\r
        <option value="invalid">invalid</option>\r
      </v-select>\r
    </div>\r
    <div class="flex gap-4">\r
      <v-button :disabled="example.isVisible" @click="example.isVisible = true">\r
        Show alert\r
      </v-button>\r
    </div>\r
  </div>\r
  <v-tabs base="material" class="mt-5">\r
    <v-tab name="Props">\r
      <div class="flex flex-col gap-y-2 mt-5">\r
        <div>\r
          <label for="model" class="font-semibold">v-model:</label>\r
          <v-input type="text" id="model" inline v-model="example.isVisible"></v-input>\r
        </div>\r
        <div>\r
          <label for="dismissable">dismissable:</label>\r
          <v-select-prop id="dismissable" v-model="example.dismissable">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="auto-dismiss-delay">auto-dismiss-delay:</label>\r
          <v-input\r
            type="text"\r
            id="auto-dismiss-delay"\r
            inline\r
            v-model="example.autoDismissDelay"\r
          ></v-input>\r
        </div>\r
      </div>\r
    </v-tab>\r
  </v-tabs>\r
<!-- CUT END -->\r
</template>\r
\r
<script>\r
import { reactive } from "vue";\r
\r
export default {\r
  setup() {\r
    let example = reactive({\r
      isVisible: true,\r
      isVisibleAbsolute: false,\r
      dismissable: true,\r
      autoDismissDelay: 0,\r
      variant: "info",\r
      icon: "info",\r
    });\r
\r
    return {\r
      example,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{e as default};
