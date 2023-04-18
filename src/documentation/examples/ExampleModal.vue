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
        inline
        :items="['top', 'center', 'bottom']"
      ></v-select>
    </div>
    <div>
      <label for="size">size:</label>
      <v-select
        id="size"
        v-model="example.size"
        inline
        :items="['sm', 'md', 'lg', 'xl', 'fit']"
      ></v-select>
    </div>
    <div>
      <label for="transition">transition:</label>
      <v-select
        id="transition"
        v-model="example.transition"
        inline
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
    <div class="flex gap-x-4 justify-around">
      <div>
        <div class="mb-2">
          <v-input
            label="title"
            type="text"
            id="title"
            v-model="example.title"
          ></v-input>
        </div>
        <div class="mb-2">
          <v-select-prop
            label="no-primary-button"
            id="no-primary-button"
            v-model="example.noPrimaryButton"
            :inline="false"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <v-select-prop
            label="no-secondary-button"
            id="no-secondary-button"
            v-model="example.noSecondaryButton"
            :inline="false"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <v-input
            label="primary-button-label"
            type="text"
            id="primary-button-label"
            v-model="example.primaryButtonLabel"
          ></v-input>
        </div>
        <div class="mb-2">
          <v-input
            label="secondary-button-label"
            type="text"
            id="secondary-button-label"
            v-model="example.secondaryButtonLabel"
          ></v-input>
        </div>
        <div class="mb-2">
          <v-select-prop
            label="primary-button-close"
            id="primary-button-close"
            v-model="example.primaryButtonClose"
            :inline="false"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <v-select-prop
            label="secondary-button-close"
            id="secondary-button-close"
            v-model="example.secondaryButtonClose"
            :inline="false"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <v-select
            label="justify-buttons"
            id="justify-buttons"
            v-model="example.justifyButtons"
            :items="['start', 'end', 'center', 'between', 'around', 'evenly']"
            :inline="false"
          ></v-select>
        </div>
      </div>
      <div>
        <div class="mb-2">
          <v-select-prop
            label="no-close-button"
            id="no-close-button"
            v-model="example.noCloseButton"
            :inline="false"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <v-select-prop
            label="static-backdrop"
            id="static-backdrop"
            v-model="example.staticBackdrop"
            :inline="false"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <v-select-prop
            label="no-header"
            id="no-header"
            v-model="example.noHeader"
            :inline="false"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <v-select-prop
            label="no-footer"
            id="no-footer"
            v-model="example.noFooter"
            :inline="false"
          ></v-select-prop>
        </div>
        <div class="mb-2">
          <v-select
            label="position"
            id="position-modal"
            v-model="example.position"
            :items="['top', 'center', 'bottom']"
            :inline="false"
          ></v-select>
        </div>
        <div class="mb-2">
          <v-select
            label="size"
            id="size-modal"
            v-model="example.size"
            :items="['sm', 'md', 'lg', 'xl', 'fit']"
            :inline="false"
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

<script setup>
import { ref, reactive } from "vue";
import { longText } from "../example-data/data.js";

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
  size: "sm",
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
</script>
