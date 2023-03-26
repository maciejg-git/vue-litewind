<template>
  <v-input
    v-model="model"
    type="text"
    inline
    icon="b-exclamation-circle"
    clearable
    style-close-button-wrapper="if-hover"
    style-icon="if-focused"
    placeholder="Type something..."
  ></v-input>
</template>

<script setup>
import { ref } from "vue";

let model = ref("");
</script>
