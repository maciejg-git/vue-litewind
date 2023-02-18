<template>
  <v-alert
    v-model="example.isVisible"
    icon="info"
    style-alert="bold info"
  >
    Alert
  </v-alert>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      isVisible: true,
    });

    return {
      example,
    };
  },
};
</script>
