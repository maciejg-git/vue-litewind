<template>
  <!-- simple indeterminate progress -->

  <v-progress
    mod-progress="size:tiny"
    mod-progress-bar="variant:gradient"
    indeterminate
    class="my-8"
  ></v-progress>

  <!-- simple indeterminate progress -->

  <v-card width="400px">
    <div class="flex justify-center p-4">Checking for updates...</div>
    <v-progress
      mod-progress="size:tiny"
      mod-progress-bar="variant:gradient"
      indeterminate
      class="m-2"
    ></v-progress>
  </v-card>

  <!-- combined indeterminate and deteminate progress -->

  <div class="my-6">Combined indeterminate and deteminate example</div>

  <v-card width="400px">
    <div class="flex justify-center p-4">
      <span v-if="example.indeterminate">Checking for updates...</span>
      <span v-if="!example.indeterminate">Updating...</span>
    </div>
    <v-progress
      mod-progress="size:tiny"
      mod-progress-bar="variant:gradient"
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
    if (example.indeterminate) return
    example.value = 0;
    let i = setInterval(() => {
      example.value += 0.2;
      if (example.value >= 100) {
        clearInterval(i);
      }
    }, 10);
  }, 3000);
});
</script>
