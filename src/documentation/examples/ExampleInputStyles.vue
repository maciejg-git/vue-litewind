<template>
  <!-- underlined -->

  <div class="flex gap-x-10">
    <v-input
      v-model="example"
      base="underlined"
      placeholder="Type something..."
    ></v-input>

    <!-- rounded -->

    <v-input
      v-model="example"
      base="round"
      placeholder="Type something..."
    ></v-input>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let example = ref("")

    return {
      example,
    };
  },
};
</script>
