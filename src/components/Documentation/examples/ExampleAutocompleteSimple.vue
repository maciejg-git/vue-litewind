<template>
  <v-autocomplete
    v-model="example.model"
    :items="example.items"
    style-dropdown="shadow"
    class="w-[620px]"
  ></v-autocomplete>
</template>

<script>
import { reactive } from "vue";
import { languages } from "../../../const";

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
