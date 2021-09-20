<template>
  <div class="flex">
    <v-card style="width: 320px" class="p-2">
      <v-date-picker v-model="example.single" adjacent-months></v-date-picker>
    </v-card>
    <span class="ml-10">v-model (single): {{ example.single }}</span>
  </div>
  <div class="flex">
    <v-card style="width: 320px" class="p-2 mt-2">
      <v-date-picker
        v-model="example.range"
        range
        adjacent-months
      ></v-date-picker>
    </v-card>
    <span class="ml-10">v-model (range): {{ example.range }}</span>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      single: ref(""),
      range: ref(""),
    });

    return {
      example,
    };
  },
};
</script>
