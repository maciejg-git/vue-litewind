<template>
  <div class="w-1/2">
    <v-select
      v-model="example.model"
      :items="example.items"
      multi-value
      style-menu="shadow"
    ></v-select>
  </div>
  {{ example.model }}
</template>

<script>
import { reactive } from "vue";
import { languages } from "../data/data.js";

export default {
  setup() {
    let example = reactive({
      // model: "",
      model: [],
      items: languages,
    });

    return {
      example,
    };
  },
};
</script>
