<template>
  <div class="w-1/2">
    <v-input
      v-model="model"
      type="text"
      label="Username"
      placeholder="Type something..."
    ></v-input>
  </div>
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
