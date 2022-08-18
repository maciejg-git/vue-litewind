const r=`<template>\r
  <v-dropdown>\r
    <template #reference="{ reference, onTrigger }">\r
      <v-input\r
        :ref="reference"\r
        v-on="onTrigger"\r
        type="text"\r
        v-model="example.date"\r
        placeholder="Pick date"\r
      ></v-input>\r
    </template>\r
    <template #default="{ hide }">\r
      <v-card style-card="shadow" class="p-2">\r
        <v-date-picker\r
          v-model="example.date"\r
          width="305px"\r
          :buttons="example.buttons"\r
          adjacent-months\r
          @state:done="hide"\r
        />\r
      </v-card>\r
    </template>\r
  </v-dropdown>\r
<!-- CUT START -->\r
  <div class="mt-4 lg:ml-10 lg:mt-0">\r
    <div class="mb-2">\r
      <label for="dropdown-buttons">buttons:</label>\r
      <v-select-prop id="dropdown-buttons" v-model="example.buttons">\r
        <option :value="true">true</option>\r
        <option :value="false">false</option>\r
      </v-select-prop>\r
    </div>\r
  </div>\r
<!-- CUT END -->\r
</template>\r
\r
<script>\r
import { reactive } from "vue";\r
\r
export default {\r
  setup() {\r
    let example = reactive({\r
      date: "",\r
      buttons: false,\r
    });\r
\r
    return {\r
      example,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{r as default};
