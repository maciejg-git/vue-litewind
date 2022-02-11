<template>
  <v-table :items="example.data" class="w-full"></v-table>
</template>

<script>
import { reactive } from "vue";
import data from "../data/data.json";

export default {
  setup() {
    let example = reactive({
      data: data.slice(0, 5),
    });

    return {
      example,
    };
  },
};
</script>
