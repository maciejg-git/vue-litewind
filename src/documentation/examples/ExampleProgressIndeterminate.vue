<template>
  <!-- simple indeterminate progress -->

  <v-progress
    style-progress="tiny"
    style-progress-bar="gradient"
    indeterminate
    :indeterminate-width="50"
    :indeterminate-timing="example.timing"
    :indeterminate-speed="example.speed"
    class="my-8"
  ></v-progress>

  <!-- simple indeterminate progress -->

  <v-card
    style-card="shadow"
    width="400px"
  >
    <div class="flex justify-center p-4">Checking for updates...</div>
    <v-progress
      style-progress="tiny"
      style-progress-bar="gradient"
      indeterminate
      class="m-2"
    ></v-progress>
  </v-card>

  <!-- combined indeterminate and deteminate progress -->

  <div class="my-6">Combined indeterminate and deteminate example</div>

  <v-card
    style-card="shadow"
    width="400px"
  >
    <div class="flex justify-center p-4">
      <span v-if="example.indeterminate">Checking for updates...</span>
      <span v-if="!example.indeterminate">Updating...</span>
    </div>
    <v-progress
      style-progress="tiny"
      style-progress-bar="gradient"
      :value="example.value"
      :label="false"
      :indeterminate="example.indeterminate"
      class="m-2"
    ></v-progress>
  </v-card>
</template>

<script setup>
import { reactive, onMounted } from "vue";

let example = reactive({
  value: 0,
  label: false,
  indeterminate: true,
});

onMounted(() => {
  setInterval(() => {
    example.indeterminate = !example.indeterminate;
    example.value = 0;
    let i = setInterval(() => {
      example.value += 0.05;
      if (example.value >= 100) {
        clearInterval(i);
      }
    }, 2);
  }, 6000);
});
</script>
