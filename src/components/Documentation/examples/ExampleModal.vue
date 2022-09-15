<template>
  <div class="flex gap-x-4 w-full">
    <v-button @click="state.isVisible = !state.isVisible">Show modal</v-button>
    <v-button @click="state.isVisibleLong = !state.isVisibleLong">
      Show long scrollable modal
    </v-button>
  </div>
  <!-- CUT START -->
  <div class="flex flex-col gap-y-2 mt-10">
    <div>
      <label for="position">position:</label>
      <v-select
        id="position"
        v-model="example.position"
        :items="['top', 'center', 'bottom']"
      ></v-select>
    </div>
    <div>
      <label for="size">size:</label>
      <v-select
        id="size"
        v-model="example.size"
        :items="['sm', 'md', 'lg', 'xl', 'fit']"
      ></v-select>
    </div>
    <div>
      <label for="transition">transition:</label>
      <v-select
        id="transition"
        v-model="example.transition"
        :items="['fade', 'fade-slide', 'fade-scale']"
      ></v-select>
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
          <label
            for="title"
            class="mr-2"
          >
            title:
          </label>
          <v-input
            type="text"
            id="title"
            inline
            v-model="example.title"
          ></v-input>
        </div>
        <div class="mb-2">
          <label
            for="no-primary-button"
            class="mr-2"
          >
            no-primary-button:
          </label>
          <v-select-prop
            id="no-primary-button"
            v-model="example.noPrimaryButton"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <label
            for="no-secondary-button"
            class="mr-2"
          >
            no-secondary-button:
          </label>
          <v-select-prop
            id="no-secondary-button"
            v-model="example.noSecondaryButton"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <label
            for="primary-button-label"
            class="mr-2"
          >
            primary-button-label:
          </label>
          <v-input
            type="text"
            id="primary-button-label"
            inline
            v-model="example.primaryButtonLabel"
          ></v-input>
        </div>
        <div class="mb-2">
          <label
            for="secondary-button-label"
            class="mr-2"
          >
            secondary-button-label:
          </label>
          <v-input
            type="text"
            id="secondary-button-label"
            inline
            v-model="example.secondaryButtonLabel"
          ></v-input>
        </div>
        <div class="mb-2">
          <label
            for="primary-button-close"
            class="mr-2"
          >
            primary-button-close:
          </label>
          <v-select-prop
            id="primary-button-close"
            v-model="example.primaryButtonClose"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <label
            for="secondary-button-close"
            class="mr-2"
          >
            secondary-button-close:
          </label>
          <v-select-prop
            id="secondary-button-close"
            v-model="example.secondaryButtonClose"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <label
            for="justify-buttons"
            class="mr-2"
          >
            justify-buttons:
          </label>
          <v-select
            id="justify-buttons"
            v-model="example.justifyButtons"
            :items="['start', 'end', 'center', 'between', 'around', 'evenly']"
          ></v-select>
        </div>
      </div>
      <div>
        <div class="mb-2">
          <label
            for="no-close-button"
            class="mr-2"
          >
            no-close-button:
          </label>
          <v-select-prop
            id="no-close-button"
            v-model="example.noCloseButton"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <label
            for="static-backdrop"
            class="mr-2"
          >
            static-backdrop:
          </label>
          <v-select-prop
            id="static-backdrop"
            v-model="example.staticBackdrop"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <label
            for="no-header"
            class="mr-2"
          >
            no-header:
          </label>
          <v-select-prop
            id="no-header"
            v-model="example.noHeader"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <label
            for="no-footer"
            class="mr-2"
          >
            no-footer:
          </label>
          <v-select-prop
            id="no-footer"
            v-model="example.noFooter"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <label
            for="position-modal"
            class="mr-2"
          >
            position:
          </label>
          <v-select
            id="position-modal"
            v-model="example.position"
            :items="['top', 'center', 'bottom']"
          ></v-select>
        </div>
        <div class="mb-2">
          <label
            for="size-modal"
            class="mr-2"
          >
            size:
          </label>
          <v-select
            id="size-modal"
            v-model="example.size"
            :items="['sm', 'md', 'lg', 'xl', 'fit']"
          ></v-select>
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
</template>

<script>
import { ref, reactive } from "vue";
import { longText } from "../data/data.js";

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
      staticBackdrop: false,
      noHeader: false,
      noFooter: false,
      position: "top",
      size: "md",
      transition: "fade-slide",
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
