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

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let model = ref("");

    return {
      model,
    };
  },
};
</script>
