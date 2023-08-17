<template>
  <v-button @click="isVisible = !isVisible">Show customized modal</v-button>

  <v-modal
    v-model="isVisible"
    size="fit"
    mod-modal="shape:square"
    :backdrop="{ modBackdrop: 'filter:blur' }"
  >
    <template #modal="{ close }">
      <div class="group">
        <img
          :src="'/assets/' + images[currentImage]"
          width="1000"
          alt=""
        />
        <v-close-button
          class="absolute top-5 right-5"
          @click="close()"
        />
        <div class="absolute bottom-0 w-full flex justify-center gap-x-4 p-2">
          <img
            v-for="(image, index) in images"
            :src="'/assets/' + image"
            width="110"
            alt=""
            :class="{
              'ring-4 ring-indigo-500': image === images[currentImage],
            }"
            class="opacity-0 group-hover:opacity-100 transition-opacity shadow-md shadow-black/30 hover:scale-105 duration-300 cursor-pointer"
            @click="currentImage = index"
          />
        </div>
        <v-button
          @click="prev()"
          mod-button="preset:plain"
          class="absolute -translate-y-1/2 top-1/2 left-5 duration-300 transition-opacity text-white opacity-0 group-hover:opacity-80"
        >
          <v-icon
            name="fa-chevron-left-solid"
            class="w-12 h-12"
          ></v-icon>
        </v-button>
        <v-button
          @click="next()"
          mod-button="preset:plain"
          class="absolute -translate-y-1/2 top-1/2 right-5 duration-300 transition-opacity text-white opacity-0 group-hover:opacity-80"
        >
          <v-icon
            name="fa-chevron-right-solid"
            class="w-12 h-12"
          ></v-icon>
        </v-button>
      </div>
    </template>
  </v-modal>
</template>

<script setup>
import { ref } from "vue";

let isVisible = ref(false);

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
