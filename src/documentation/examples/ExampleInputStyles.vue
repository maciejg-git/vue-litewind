<template>
  <!-- underlined -->

  <div class="flex gap-x-10">
    <v-input
      v-model="example"
      base="underlined-input"
      placeholder="Type something..."
    ></v-input>

    <!-- rounded -->

    <v-input
      v-model="example"
      base="round"
      placeholder="Type something..."
    ></v-input>
  </div>
</template>

<script setup>
import { ref } from "vue";

let example = ref("");
</script>
