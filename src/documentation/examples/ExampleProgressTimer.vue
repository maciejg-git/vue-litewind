<template>
  <v-progress
    :timer="10000"
    autostart-timer
    mod-progress="size:medium shape:square"
    mod-progress-bar="shape:square"
  ></v-progress>
</template>

<script setup>
import { reactive, ref } from "vue";
</script>
