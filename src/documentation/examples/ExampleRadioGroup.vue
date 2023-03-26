<template>
  <v-radio-group v-model="language">
    <v-radio
      v-for="l in languagesData"
      :value="l"
      :id="'language-' + l"
      :label="l"
      class="my-2"
    ></v-radio>
  </v-radio-group>

  <div class="mt-5">
    <span class="font-semibold">Language:</span>
    {{ language }}
  </div>
</template>

<script setup>
import { ref } from "vue";

let language = ref("");

let languagesData = ref([
  "english",
  "swedish",
  "korean",
  "german",
  "icelandic",
  "japanese",
]);
</script>
