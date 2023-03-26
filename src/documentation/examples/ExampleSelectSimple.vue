<template>
  <div class="flex items-center">
    <div class="w-1/2">
      <v-select
        v-model="example.model"
        :items="example.items"
        :inline="false"
        style-menu="shadow"
      ></v-select>
    </div>
    <div class="ml-10">
      <span class="font-semibold">v-model:</span>
      {{ example.model }}
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { languages } from "../example-data/data.js";

let example = reactive({
  model: "",
  items: languages,
});
</script>
