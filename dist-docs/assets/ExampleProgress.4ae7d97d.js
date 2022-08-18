const r=`<template>\r
  <!-- simple progress -->\r
\r
  <v-progress v-bind="example"></v-progress>\r
\r
  <!-- progress with custom label -->\r
\r
  <v-progress\r
    v-bind="example"\r
    style-progress="rounded"\r
    style-progress-bar="red rounded"\r
    class="mt-4"\r
  >\r
    <template #default="{ value, max }">\r
      {{ value.toFixed() }} / {{ max }}\r
    </template>\r
  </v-progress>\r
\r
  <!-- narrow, styled progress -->\r
\r
  <v-progress\r
    v-bind="example"\r
    style-progress="tiny"\r
    style-progress-bar="gradient"\r
    class="mt-4"\r
  ></v-progress>\r
\r
  <!-- page load progress -->\r
\r
  <v-progress\r
    style-progress="tiny transparent"\r
    style-progress-bar="gradient"\r
    :value="example.value"\r
    :label="false"\r
    :transition="example.transition"\r
    class="fixed top-0 left-0 w-full z-50"\r
  ></v-progress>\r
  <!-- CUT START -->\r
  <v-tabs base="material" class="mt-10">\r
    <v-tab name="Props">\r
      <div class="flex flex-col gap-y-2 mt-5">\r
        <div>\r
          <label for="value">value:</label>\r
          <v-input\r
            type="text"\r
            id="value"\r
            inline\r
            v-model.number="example.value"\r
          ></v-input>\r
          <v-button\r
            style-button="small"\r
            @click="example.value += 10"\r
            class="ml-2"\r
          >\r
            +10\r
          </v-button>\r
          <v-button\r
            style-button="small"\r
            @click="example.value -= 10"\r
            class="ml-2"\r
          >\r
            -10\r
          </v-button>\r
        </div>\r
        <div>\r
          <label for="max">max:</label>\r
          <v-input type="text" id="max" inline v-model.number="example.max"></v-input>\r
        </div>\r
        <div>\r
          <label for="precision">precision:</label>\r
          <v-input\r
            type="text"\r
            id="precision"\r
            inline\r
            v-model.number="example.precision"\r
          ></v-input>\r
        </div>\r
        <div>\r
          <label for="label">label:</label>\r
          <v-select-prop id="label" v-model="example.label">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="transition">transition:</label>\r
          <v-select-prop id="transition" v-model="example.transition">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
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
      value: 20,\r
      max: 100,\r
      label: false,\r
      precision: 2,\r
      transition: true,\r
    });\r
\r
    return {\r
      example,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{r as default};
