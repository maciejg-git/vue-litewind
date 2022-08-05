<template>
  <v-input
    v-model="model"
    type="text"
    inline
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
