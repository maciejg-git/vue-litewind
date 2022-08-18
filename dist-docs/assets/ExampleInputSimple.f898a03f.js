const r=`<template>\r
  <v-input\r
    v-model="model"\r
    type="text"\r
    label="Username"\r
    inline\r
    placeholder="Type something..."\r
  ></v-input>\r
</template>\r
\r
<script>\r
import { ref } from "vue";\r
\r
export default {\r
  setup() {\r
    let model = ref("");\r
\r
    return {\r
      model,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{r as default};
