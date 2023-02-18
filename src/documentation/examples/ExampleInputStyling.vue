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

<script>
import { ref } from "vue";

export default {
  setup() {
    let model = ref("");

    return {
      model,
    };
  },
};
</script>
