const e=`<template>\r
  <v-button>\r
    Button\r
    <v-chevron\r
      :initial="example.initial"\r
      :rotate180="example.rotate180"\r
      :triangle="example.triangle"\r
      :counter-clockwise="example.counterClockwise"\r
      :switch="example.switch"\r
      style-chevron="right"\r
    />\r
  </v-button>\r
  <!-- CUT START -->\r
  <v-tabs base="material" class="mt-5">\r
    <v-tab name="Props">\r
      <div class="flex flex-col gap-y-2 mt-5">\r
        <div>\r
          <label for="initial">initial:</label>\r
          <v-select id="initial" v-model="example.initial">\r
            <option value="down">down</option>\r
            <option value="left">left</option>\r
            <option value="right">right</option>\r
            <option value="up">up</option>\r
          </v-select>\r
        </div>\r
        <div>\r
          <label for="rotate180">rotate180:</label>\r
          <v-select-prop id="rotate180" v-model="example.rotate180">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="triangle">triangle:</label>\r
          <v-select-prop id="triangle" v-model="example.triangle">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="counter-clockwise">counter-clockwise:</label>\r
          <v-select-prop id="counter-clockwise" v-model="example.counterClockwise">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div>\r
          <label for="switch">switch:</label>\r
          <v-select-prop id="switch" v-model="example.switch">\r
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
      initial: "right",\r
      rotate180: false,\r
      triangle: false,\r
      counterClockwise: false,\r
      switch: false,\r
    });\r
\r
    return {\r
      example,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{e as default};
