<template>
  <div class="w-1/2">
    <v-select
      v-model="example.model"
      :items="example.items"
      :inline="false"
      multi-value
      style-menu="shadow"
    ></v-select>
  </div>
</template>

<script>
import { reactive } from "vue";
import { languages } from "../data/data.js";

export default {
  setup() {
    let example = reactive({
      model: [],
      items: languages,
    });

    return {
      example,
    };
  },
};
</script>
