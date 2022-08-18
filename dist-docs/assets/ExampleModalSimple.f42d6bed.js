const r=`<template>\r
  <v-button @click="isVisible = !isVisible">Show modal</v-button>\r
\r
  <v-modal\r
    v-model="isVisible"\r
    title="Simple modal"\r
    primary-button-close\r
    secondary-button-close\r
  >\r
    Simple modal it is.\r
  </v-modal>\r
</template>\r
\r
<script>\r
import { ref } from "vue";\r
\r
export default {\r
  setup() {\r
    let isVisible = ref(false);\r
\r
    return {\r
      isVisible,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{r as default};
