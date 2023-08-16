<template>
  <!-- underlined -->

  <div class="flex flex-col md:flex-row gap-y-6 md:gap-x-10">
    <v-input
      v-model="example"
      base="underlinedInput"
      placeholder="Type something..."
    ></v-input>

    <!-- rounded -->

    <v-input
      v-model="example"
      base="roundedInput"
      placeholder="Type something..."
    ></v-input>
  </div>
</template>

<script setup>
import { ref } from "vue";

let example = ref("");
</script>
