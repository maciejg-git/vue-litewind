<template>
  <v-input
    v-model="model"
    :icon="model.length ? 'b-exclamation-circle' : ''"
    clearable
    inline
    placeholder="Type something..."
    :visible-condition="{
      clearButton: 'hover',
    }"
  ></v-input>
</template>

<script setup>
import { ref, reactive } from "vue";

let model = ref("");
</script>
