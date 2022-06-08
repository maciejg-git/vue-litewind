<template>
  <div class="flex flex-col items-center gap-y-2 w-full md:w-1/2">
    <v-button @click="state.isVisible = !state.isVisible">
      Show modal
    </v-button>
    <v-button @click="state.isVisibleLong = !state.isVisibleLong">
      Show long scrollable modal
    </v-button>
    <v-button @click="state.isVisibleImage = !state.isVisibleImage">
      Show image modal
    </v-button>
  </div>
<!-- CUT START -->
  <div class="flex flex-col gap-y-2 mt-4 md:ml-14 md:mt-0">
    <div>
      <label for="position">position:</label>
      <v-select id="position" v-model="example.position">
        <option value="top">top</option>
        <option value="center">center</option>
      </v-select>
    </div>
    <div>
      <label for="size">size:</label>
      <v-select id="size" v-model="example.size">
        <option value="sm">sm</option>
        <option value="md">md</option>
        <option value="lg">lg</option>
        <option value="xl">xl</option>
        <option value="fit">fit</option>
      </v-select>
    </div>
    <div>
      <label for="transition">transition:</label>
      <v-select id="transition" v-model="example.transition">
        <option value="fade-f">fade-f</option>
        <option value="fade-m">fade-m</option>
        <option value="fade-s">fade-s</option>
        <option value="fade-slide-f">fade-slide-f</option>
        <option value="fade-slide-m">fade-slide-m</option>
        <option value="fade-slide-s">fade-slide-s</option>
        <option value="fade-scale-f">fade-scale-f</option>
        <option value="fade-scale-m">fade-scale-m</option>
        <option value="fade-scale-s">fade-scale-s</option>
      </v-select>
    </div>
  </div>
<!-- CUT END -->

  <!-- modal -->

  <v-modal 
    v-model="state.isVisible" 
    v-bind="example"
  >
    <!-- forms -->
<!-- CUT START -->
    <div class="flex justify-around">
      <div>
        <div class="mb-2">
          <label for="title" class="mr-2">title:</label>
          <v-input type="text" id="title" v-model="example.title"></v-input>
        </div>
        <div class="mb-2">
          <label for="no-primary-button" class="mr-2">no-primary-button:</label>
          <v-select id="no-primary-button" v-model="example.noPrimaryButton">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div class="mb-2">
          <label for="no-secondary-button" class="mr-2">
            no-secondary-button:
          </label>
          <v-select id="no-secondary-button" v-model="example.noSecondaryButton">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div class="mb-2">
          <label for="primary-button-label" class="mr-2">
            primary-button-label:
          </label>
          <v-input
            type="text"
            id="primary-button-label"
            v-model="example.primaryButtonLabel"
          ></v-input>
        </div>
        <div class="mb-2">
          <label for="secondary-button-label" class="mr-2">
            secondary-button-label:
          </label>
          <v-input
            type="text"
            id="secondary-button-label"
            v-model="example.secondaryButtonLabel"
          ></v-input>
        </div>
        <div class="mb-2">
          <label for="primary-button-close" class="mr-2">
            primary-button-close:
          </label>
          <v-select
            id="primary-button-close"
            v-model="example.primaryButtonClose"
          >
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div class="mb-2">
          <label for="secondary-button-close" class="mr-2">
            secondary-button-close:
          </label>
          <v-select
            id="secondary-button-close"
            v-model="example.secondaryButtonClose"
          >
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div class="mb-2">
          <label for="justify-buttons" class="mr-2">justify-buttons:</label>
          <v-select id="justify-buttons" v-model="example.justifyButtons">
            <option value="start">start</option>
            <option value="end">end</option>
            <option value="center">center</option>
            <option value="between">between</option>
            <option value="around">around</option>
            <option value="evenly">evenly</option>
          </v-select>
        </div>
      </div>
      <div>
        <div class="mb-2">
          <label for="no-close-button" class="mr-2">no-close-button:</label>
          <v-select id="no-close-button" v-model="example.noCloseButton">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div class="mb-2">
          <label for="close-button-in-content" class="mr-2">
            close-button-in-content:
          </label>
          <v-select
            id="close-button-in-content"
            v-model="example.closeButtonInContent"
          >
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div class="mb-2">
          <label for="static-backdrop" class="mr-2">static-backdrop:</label>
          <v-select id="static-backdrop" v-model="example.staticBackdrop">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div class="mb-2">
          <label for="no-header" class="mr-2">no-header:</label>
          <v-select id="no-header" v-model="example.noHeader">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div class="mb-2">
          <label for="no-footer" class="mr-2">no-footer:</label>
          <v-select id="no-footer" v-model="example.noFooter">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div class="mb-2">
          <label for="position-modal" class="mr-2">position:</label>
          <v-select id="position-modal" v-model="example.position">
            <option value="top">top</option>
            <option value="center">center</option>
          </v-select>
        </div>
        <div class="mb-2">
          <label for="size-modal" class="mr-2">size:</label>
          <v-select id="size-modal" v-model="example.size">
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
            <option value="xl">xl</option>
          </v-select>
        </div>
      </div>
    </div>
<!-- CUT END -->
  </v-modal>

  <!-- long scrollable modal -->

  <v-modal
    v-model="state.isVisibleLong"
    v-bind="example"
  >
    {{ longText[0] }}
  </v-modal>

  <!-- image modal -->

  <v-modal
    v-model="state.isVisibleImage"
    no-header
    no-footer
    close-button-in-content
    size="fit"
    :position="example.position"
    :transition="example.transition"
    style-content="edge-to-edge"
  >
    <img :src="'/assets/' + images[currentImage]" width="1000" alt="" />
    <v-button
      @click="prev()"
      style-button="secondary"
      class="absolute bottom-4 left-4 opacity-97 mix-blend-screen"
    >
      Previous
    </v-button>
    <v-button
      @click="next()"
      style-button="secondary"
      class="absolute bottom-4 right-4 opacity-97 mix-blend-screen"
    >
      Next
    </v-button>
  </v-modal>
</template>

<script>
import { ref, reactive } from "vue";
import { longText } from "../../../const";

export default {
  setup() {
    let example = reactive({
      title: "Example modal",
      noPrimaryButton: false,
      noSecondaryButton: false,
      primaryButtonLabel: "OK",
      secondaryButtonLabel: "Cancel",
      primaryButtonClose: false,
      secondaryButtonClose: true,
      justifyButtons: "end",
      noCloseButton: false,
      closeButtonInContent: false,
      staticBackdrop: false,
      noHeader: false,
      noFooter: false,
      position: "top",
      size: "md",
      transition: "fade-slide-m",
    });

    let state = reactive({
      isVisible: false,
      isVisibleLong: false,
      isVisibleImage: false,
    });

    let images = ["mononoke035.jpg", "mononoke033.jpg"];

    let currentImage = ref(0);

    let next = () => {
      return (currentImage.value =
        currentImage.value + 1 > 1 ? 0 : currentImage.value + 1);
    };

    let prev = () => {
      return (currentImage.value =
        currentImage.value - 1 < 0 ? 1 : currentImage.value - 1);
    };

    return {
      example,
      state,
      longText,
      images,
      currentImage,
      next,
      prev,
    };
  },
};
</script>
