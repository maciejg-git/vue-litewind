<template>
  <v-button @click="isVisible = !isVisible">Show modal with less boring backdrop</v-button>

  <v-modal
    v-model="isVisible"
    title="Simple modal"
    :backdrop="{ modBackdrop: 'variant:gradient' }"
    primary-button-close
    secondary-button-close
  >
    Simple modal it is.
  </v-modal>
</template>

<script setup>
import { ref } from "vue";

let isVisible = ref(false);
</script>
