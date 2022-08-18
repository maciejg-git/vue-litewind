const r=`<template>\r
  <div>\r
    <v-badge style-badge="secondary" class="mr-4">\r
      New\r
      <v-badge style-badge="tiny success" class="ml-2">7</v-badge>\r
    </v-badge>\r
    <v-badge class="mr-4">New</v-badge>\r
    <v-badge style-badge="small warn" class="mr-4">New</v-badge>\r
    <v-badge style-badge="tiny success" class="mr-4">New</v-badge>\r
  </div>\r
\r
  <!-- positioned badges -->\r
\r
  <div class="mt-10">\r
    <v-button class="relative mr-6">\r
      badge button\r
      <v-badge position="top-right" style-badge="primary tiny danger">\r
        2\r
      </v-badge>\r
    </v-button>\r
\r
    <v-button class="relative mr-6">\r
      badge button\r
      <v-badge position="top-right" style-badge="circle danger"></v-badge>\r
    </v-button>\r
  </div>\r
\r
  <!-- custom position badge -->\r
\r
  <div class="mt-10">\r
    <v-button class="relative">\r
      badge button (custom)\r
      <v-badge\r
        style-badge="primary tiny danger"\r
        class="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2"\r
      >\r
        9\r
      </v-badge>\r
    </v-button>\r
  </div>\r
\r
  <p class="my-6">Animated badges</p>\r
\r
  <div>\r
    <v-badge\r
      style-badge="small secondary"\r
      update-animation="scale-up"\r
      :update-key="example"\r
      class="mr-10"\r
    >\r
      {{ example }}\r
    </v-badge>\r
    <v-badge\r
      style-badge="small secondary"\r
      update-animation="bounce"\r
      :update-key="example"\r
      class="mr-10"\r
    >\r
      {{ example }}\r
    </v-badge>\r
    <v-badge\r
      style-badge="small secondary"\r
      update-animation="to-danger"\r
      :update-key="example"\r
      class="mr-10"\r
    >\r
      {{ example }}\r
    </v-badge>\r
    <v-badge\r
      style-badge="small secondary"\r
      update-animation="to-success"\r
      :update-key="example"\r
      class="mr-10"\r
    >\r
      {{ example }}\r
    </v-badge>\r
  </div>\r
  <div class="mt-10">\r
    <v-button @click="example = (Math.random() * 100).toFixed()">\r
      Update badge value\r
    </v-button>\r
  </div>\r
</template>\r
\r
<script>\r
import { ref } from "vue";\r
\r
export default {\r
  setup() {\r
    let example = ref(4);\r
\r
    return {\r
      example,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{r as default};
