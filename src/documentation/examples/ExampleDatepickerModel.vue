<template>
  <!-- single mode -->

  <div class="flex flex-col md:flex-row">
    <v-card
      style="width: 320px"
      class="p-2"
    >
      <v-date-picker
        v-model="example.single"
        adjacent-months
      />
    </v-card>
    <span class="ml-0 md:ml-10 mt-2 md:mt-0">v-model (single): {{ example.single }}</span>
  </div>

  <!-- range mode -->

  <div class="flex flex-col md:flex-row mt-4">
    <v-card
      style="width: 320px"
      class="p-2"
    >
      <v-date-picker
        v-model="example.range"
        range
        adjacent-months
      />
    </v-card>
    <span class="ml-0 md:ml-10 mt-2 md:mt-0">v-model (range): {{ example.range }}</span>
  </div>
</template>

<script setup>
import { reactive } from "vue";

let example = reactive({
  single: "",
  range: "",
});
</script>
