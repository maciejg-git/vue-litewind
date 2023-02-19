<template>
  <v-table :items="example.data" :primary-key="example.primaryKey" class="w-full"></v-table>
</template>

<script>
import { reactive } from "vue";
import data from "../data/company-simple.json";

export default {
  setup() {
    let example = reactive({
      data: data.slice(0, 5),
      primaryKey: "id",
    });

    return {
      example,
    };
  },
};
</script>
