<template>
  <v-select
    v-model="example.model"
    :items="example.items"
    icon="b-exclamation-circle"
    inline
    style-menu="shadow"
    class="w-[420px]"
  ></v-select>
</template>

<script>
import { reactive } from "vue";
import { languages } from "../data/data.js";

export default {
  setup() {
    let example = reactive({
      model: "",
      items: languages,
    });

    return {
      example,
    };
  },
};
</script>
