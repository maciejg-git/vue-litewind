const n=`<template>\r
  <div class="flex flex-col items-center gap-y-2 w-full md:w-1/2">\r
    <v-button @click="state.isVisible = !state.isVisible">\r
      Show modal\r
    </v-button>\r
    <v-button @click="state.isVisibleLong = !state.isVisibleLong">\r
      Show long scrollable modal\r
    </v-button>\r
    <v-button @click="state.isVisibleImage = !state.isVisibleImage">\r
      Show image modal\r
    </v-button>\r
  </div>\r
<!-- CUT START -->\r
  <div class="flex flex-col gap-y-2 mt-4 md:ml-14 md:mt-0">\r
    <div>\r
      <label for="position">position:</label>\r
      <v-select id="position" v-model="example.position">\r
        <option value="top">top</option>\r
        <option value="center">center</option>\r
      </v-select>\r
    </div>\r
    <div>\r
      <label for="size">size:</label>\r
      <v-select id="size" v-model="example.size">\r
        <option value="sm">sm</option>\r
        <option value="md">md</option>\r
        <option value="lg">lg</option>\r
        <option value="xl">xl</option>\r
        <option value="fit">fit</option>\r
      </v-select>\r
    </div>\r
    <div>\r
      <label for="transition">transition:</label>\r
      <v-select id="transition" v-model="example.transition">\r
        <option value="fade-f">fade-f</option>\r
        <option value="fade-m">fade-m</option>\r
        <option value="fade-s">fade-s</option>\r
        <option value="fade-slide-f">fade-slide-f</option>\r
        <option value="fade-slide-m">fade-slide-m</option>\r
        <option value="fade-slide-s">fade-slide-s</option>\r
        <option value="fade-scale-f">fade-scale-f</option>\r
        <option value="fade-scale-m">fade-scale-m</option>\r
        <option value="fade-scale-s">fade-scale-s</option>\r
      </v-select>\r
    </div>\r
  </div>\r
<!-- CUT END -->\r
\r
  <!-- modal -->\r
\r
  <v-modal \r
    v-model="state.isVisible" \r
    v-bind="example"\r
  >\r
    <!-- forms -->\r
<!-- CUT START -->\r
    <div class="flex justify-around">\r
      <div>\r
        <div class="mb-2">\r
          <label for="title" class="mr-2">title:</label>\r
          <v-input type="text" id="title" inline v-model="example.title"></v-input>\r
        </div>\r
        <div class="mb-2">\r
          <label for="no-primary-button" class="mr-2">no-primary-button:</label>\r
          <v-select-prop id="no-primary-button" v-model="example.noPrimaryButton">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div class="mb-2">\r
          <label for="no-secondary-button" class="mr-2">\r
            no-secondary-button:\r
          </label>\r
          <v-select-prop id="no-secondary-button" v-model="example.noSecondaryButton">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div class="mb-2">\r
          <label for="primary-button-label" class="mr-2">\r
            primary-button-label:\r
          </label>\r
          <v-input\r
            type="text"\r
            id="primary-button-label"\r
            inline\r
            v-model="example.primaryButtonLabel"\r
          ></v-input>\r
        </div>\r
        <div class="mb-2">\r
          <label for="secondary-button-label" class="mr-2">\r
            secondary-button-label:\r
          </label>\r
          <v-input\r
            type="text"\r
            id="secondary-button-label"\r
            inline\r
            v-model="example.secondaryButtonLabel"\r
          ></v-input>\r
        </div>\r
        <div class="mb-2">\r
          <label for="primary-button-close" class="mr-2">\r
            primary-button-close:\r
          </label>\r
          <v-select-prop\r
            id="primary-button-close"\r
            v-model="example.primaryButtonClose"\r
          >\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div class="mb-2">\r
          <label for="secondary-button-close" class="mr-2">\r
            secondary-button-close:\r
          </label>\r
          <v-select-prop\r
            id="secondary-button-close"\r
            v-model="example.secondaryButtonClose"\r
          >\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div class="mb-2">\r
          <label for="justify-buttons" class="mr-2">justify-buttons:</label>\r
          <v-select id="justify-buttons" v-model="example.justifyButtons">\r
            <option value="start">start</option>\r
            <option value="end">end</option>\r
            <option value="center">center</option>\r
            <option value="between">between</option>\r
            <option value="around">around</option>\r
            <option value="evenly">evenly</option>\r
          </v-select>\r
        </div>\r
      </div>\r
      <div>\r
        <div class="mb-2">\r
          <label for="no-close-button" class="mr-2">no-close-button:</label>\r
          <v-select-prop id="no-close-button" v-model="example.noCloseButton">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div class="mb-2">\r
          <label for="close-button-in-content" class="mr-2">\r
            close-button-in-content:\r
          </label>\r
          <v-select-prop\r
            id="close-button-in-content"\r
            v-model="example.closeButtonInContent"\r
          >\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div class="mb-2">\r
          <label for="static-backdrop" class="mr-2">static-backdrop:</label>\r
          <v-select-prop id="static-backdrop" v-model="example.staticBackdrop">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div class="mb-2">\r
          <label for="no-header" class="mr-2">no-header:</label>\r
          <v-select-prop id="no-header" v-model="example.noHeader">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div class="mb-2">\r
          <label for="no-footer" class="mr-2">no-footer:</label>\r
          <v-select-prop id="no-footer" v-model="example.noFooter">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
        <div class="mb-2">\r
          <label for="position-modal" class="mr-2">position:</label>\r
          <v-select id="position-modal" v-model="example.position">\r
            <option value="top">top</option>\r
            <option value="center">center</option>\r
          </v-select>\r
        </div>\r
        <div class="mb-2">\r
          <label for="size-modal" class="mr-2">size:</label>\r
          <v-select id="size-modal" v-model="example.size">\r
            <option value="sm">sm</option>\r
            <option value="md">md</option>\r
            <option value="lg">lg</option>\r
            <option value="xl">xl</option>\r
          </v-select>\r
        </div>\r
      </div>\r
    </div>\r
<!-- CUT END -->\r
  </v-modal>\r
\r
  <!-- long scrollable modal -->\r
\r
  <v-modal\r
    v-model="state.isVisibleLong"\r
    v-bind="example"\r
  >\r
    {{ longText[0] }}\r
  </v-modal>\r
\r
  <!-- image modal -->\r
\r
  <v-modal\r
    v-model="state.isVisibleImage"\r
    no-header\r
    no-footer\r
    close-button-in-content\r
    size="fit"\r
    :position="example.position"\r
    :transition="example.transition"\r
    style-content="edge-to-edge"\r
  >\r
    <img :src="'/assets/' + images[currentImage]" width="1000" alt="" />\r
    <v-button\r
      @click="prev()"\r
      style-button="secondary"\r
      class="absolute bottom-4 left-4 opacity-97 mix-blend-screen"\r
    >\r
      Previous\r
    </v-button>\r
    <v-button\r
      @click="next()"\r
      style-button="secondary"\r
      class="absolute bottom-4 right-4 opacity-97 mix-blend-screen"\r
    >\r
      Next\r
    </v-button>\r
  </v-modal>\r
</template>\r
\r
<script>\r
import { ref, reactive } from "vue";\r
import { longText } from "../data/data.js";\r
\r
export default {\r
  setup() {\r
    let example = reactive({\r
      title: "Example modal",\r
      noPrimaryButton: false,\r
      noSecondaryButton: false,\r
      primaryButtonLabel: "OK",\r
      secondaryButtonLabel: "Cancel",\r
      primaryButtonClose: false,\r
      secondaryButtonClose: true,\r
      justifyButtons: "end",\r
      noCloseButton: false,\r
      closeButtonInContent: false,\r
      staticBackdrop: false,\r
      noHeader: false,\r
      noFooter: false,\r
      position: "top",\r
      size: "md",\r
      transition: "fade-slide-m",\r
    });\r
\r
    let state = reactive({\r
      isVisible: false,\r
      isVisibleLong: false,\r
      isVisibleImage: false,\r
    });\r
\r
    let images = ["mononoke035.jpg", "mononoke033.jpg"];\r
\r
    let currentImage = ref(0);\r
\r
    let next = () => {\r
      return (currentImage.value =\r
        currentImage.value + 1 > 1 ? 0 : currentImage.value + 1);\r
    };\r
\r
    let prev = () => {\r
      return (currentImage.value =\r
        currentImage.value - 1 < 0 ? 1 : currentImage.value - 1);\r
    };\r
\r
    return {\r
      example,\r
      state,\r
      longText,\r
      images,\r
      currentImage,\r
      next,\r
      prev,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{n as default};
