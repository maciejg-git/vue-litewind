<template>
  <div class="w-full md:w-1/2">
    <v-input
      v-model="model"
      type="text"
      label="Username"
      placeholder="Type something..."
    ></v-input>
  </div>
</template>

<script setup>
import { ref } from "vue";

let model = ref("");
</script>
