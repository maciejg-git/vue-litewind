const r=`<template>\r
  <!-- model collapse accordion -->\r
\r
  <p class="mt-8 mb-4">Accordion - controlled by models</p>\r
\r
  <v-accordion class="my-2">\r
    <v-card>\r
      <v-button-collapse v-model="accordion.isVisible" block class="w-full">\r
        Toggle collapse\r
      </v-button-collapse>\r
      <v-collapse v-model="accordion.isVisible">\r
        <div class="p-8">\r
          {{ text[0] }}\r
        </div>\r
      </v-collapse>\r
    </v-card>\r
\r
    <v-card class="my-2">\r
      <v-button-collapse v-model="accordion.isVisible2" block class="w-full">\r
        Toggle collapse\r
      </v-button-collapse>\r
      <v-collapse v-model="accordion.isVisible2">\r
        <div class="p-8">\r
          {{ text[1] }}\r
        </div>\r
      </v-collapse>\r
    </v-card>\r
\r
    <v-card class="my-2">\r
      <v-button-collapse v-model="accordion.isVisible3" block class="w-full">\r
        Toggle collapse\r
      </v-button-collapse>\r
      <v-collapse v-model="accordion.isVisible3">\r
        <div class="p-8">\r
          {{ text[2] }}\r
        </div>\r
      </v-collapse>\r
    </v-card>\r
  </v-accordion>\r
\r
  <!-- reference slot accordion -->\r
\r
  <p class="mt-8 mb-4">Accordion - controlled from reference slot</p>\r
\r
  <v-accordion class="my-2">\r
    <v-card base="flat">\r
      <v-collapse>\r
        <template #reference="{ isOpen, onTrigger }">\r
          <v-button-collapse\r
            :switch="isOpen"\r
            base="button-plain"\r
            block\r
            class="w-full p-3"\r
            v-on="onTrigger"\r
          >\r
            Toggle collapse\r
          </v-button-collapse>\r
        </template>\r
        <div class="p-8">\r
          {{ text[0] }}\r
        </div>\r
      </v-collapse>\r
    </v-card>\r
\r
    <v-card base="flat" class="my-2">\r
      <v-collapse>\r
        <template #reference="{ isOpen, onTrigger }">\r
          <v-button-collapse\r
            :switch="isOpen"\r
            base="button-plain"\r
            block\r
            class="w-full p-3"\r
            v-on="onTrigger"\r
          >\r
            Toggle collapse\r
          </v-button-collapse>\r
        </template>\r
        <div class="p-8">\r
          {{ text[1] }}\r
        </div>\r
      </v-collapse>\r
    </v-card>\r
\r
    <v-card base="flat" class="my-2">\r
      <v-collapse>\r
        <template #reference="{ isOpen, onTrigger }">\r
          <v-button-collapse\r
            :switch="isOpen"\r
            base="button-plain"\r
            block\r
            class="w-full p-3"\r
            v-on="onTrigger"\r
          >\r
            Toggle collapse\r
          </v-button-collapse>\r
        </template>\r
        <div class="p-8">\r
          {{ text[0] }}\r
        </div>\r
      </v-collapse>\r
    </v-card>\r
  </v-accordion>\r
</template>\r
\r
<script>\r
import { reactive } from "vue";\r
import { text } from "../data/data.js";\r
\r
export default {\r
  setup() {\r
    let accordion = reactive({\r
      isVisible: false,\r
      isVisible2: false,\r
      isVisible3: false,\r
    });\r
\r
    return {\r
      accordion,\r
      text,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{r as default};
