const e=`<template>\r
  <!-- simple indeterminate progress -->\r
\r
  <v-progress\r
    style-progress="tiny"\r
    style-progress-bar="gradient"\r
    indeterminate\r
    :indeterminate-width="50"\r
    :indeterminate-timing="example.timing"\r
    :indeterminate-speed="example.speed"\r
    class="my-8"\r
  ></v-progress>\r
\r
  <!-- simple indeterminate progress -->\r
\r
  <v-card style-card="shadow" width="400px">\r
    <div class="flex justify-center p-4">Checking for updates...</div>\r
    <v-progress\r
      style-progress="tiny"\r
      style-progress-bar="gradient"\r
      indeterminate\r
      class="m-2"\r
    ></v-progress>\r
  </v-card>\r
\r
  <!-- combined indeterminate and deteminate progress -->\r
\r
  <div class="my-6">Combined indeterminate and deteminate example</div>\r
\r
  <v-card style-card="shadow" width="400px">\r
    <div class="flex justify-center p-4">\r
      <span v-if="example.indeterminate">Checking for updates...</span>\r
      <span v-if="!example.indeterminate">Updating...</span>\r
    </div>\r
    <v-progress\r
      style-progress="tiny"\r
      style-progress-bar="gradient"\r
      :value="example.value"\r
      :label="false"\r
      :indeterminate="example.indeterminate"\r
      class="m-2"\r
    ></v-progress>\r
  </v-card>\r
</template>\r
\r
<script>\r
import { reactive, onMounted } from "vue";\r
\r
export default {\r
  setup() {\r
    let example = reactive({\r
      value: 0,\r
      label: false,\r
      indeterminate: true,\r
    });\r
\r
    onMounted(() => {\r
      setInterval(() => {\r
        example.indeterminate = !example.indeterminate;\r
        example.value = 0;\r
        let i = setInterval(() => {\r
          example.value += 0.05;\r
          if (example.value >= 100) {\r
            clearInterval(i);\r
          }\r
        }, 2);\r
      }, 6000);\r
    });\r
\r
    return {\r
      example,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{e as default};
