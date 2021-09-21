<template>

  <!-- single mode -->

  <div class="flex">
    <v-card style="width: 320px" class="p-2">
      <v-date-picker v-model="example.single" adjacent-months />
    </v-card>
    <span class="ml-10">v-model (single): {{ example.single }}</span>
  </div>

  <!-- range mode -->

  <div class="flex">
    <v-card style="width: 320px" class="p-2 mt-2">
      <v-date-picker v-model="example.range" range adjacent-months />
    </v-card>
    <span class="ml-10">v-model (range): {{ example.range }}</span>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      single: "",
      range: "",
    });

    return {
      example,
    };
  },
};
</script>
