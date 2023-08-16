<template>
  <v-input
    v-model="model"
    type="text"
    inline
    icon="b-exclamation-circle"
    clearable
    mod-close-button-wrapper="effect:showOnHover"
    mod-icon="effect:showOnFocus"
    placeholder="Type something..."
  ></v-input>
</template>

<script setup>
import { ref } from "vue";

let model = ref("");
</script>
