<template>
  <v-checkbox-group v-model="languages">
    <v-checkbox
      v-for="l in languagesData"
      :value="l"
      :id="'language-' + l"
      :label="l"
      class="my-2"
    ></v-checkbox>
  </v-checkbox-group>

  <div class="mt-5">
    <span class="font-semibold">Languages:</span>
    {{ languages }}
  </div>
</template>

<script setup>
import { ref } from "vue";

let languages = ref([]);

let languagesData = ref([
  "english",
  "swedish",
  "korean",
  "german",
  "icelandic",
  "japanese",
]);
</script>
