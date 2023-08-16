<template>
  <div class="flex flex-col md:flex-row md:items-center">
    <div class="w-full md:w-1/2">
      <v-select
        v-model="example.model"
        :items="example.items"
        multiple
        :max-multiple="2"
      >
        <template #max-multiple>
          (+{{ example.model.length - 2}} others)
        </template>
      </v-select>
    </div>
    <div class="w-1/2 md:ml-10 mt-6 md:mt-0">
      <span class="font-semibold">v-model:</span>
      {{ example.model }}
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { languages } from "../example-data/data.js";

let example = reactive({
  model: [],
  items: languages,
});
</script>
