<template>
  <v-table
    :items="example.data"
    :primary-key="example.primaryKey"
    class="w-full"
  ></v-table>
</template>

<script setup>
import { reactive } from "vue";
import data from "../example-data/company-simple.json";

let example = reactive({
  data: data.slice(0, 5),
  primaryKey: "id",
});
</script>
