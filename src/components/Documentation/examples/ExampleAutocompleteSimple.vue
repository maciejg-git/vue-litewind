<template>
  <p class="my-6">Simple autocomplete</p>

  <v-autocomplete
    v-model="example.model"
    :items="example.items"
    style-dropdown="shadow"
    class="w-[420px]"
  ></v-autocomplete>

  <p class="my-6">Simple autocomplete with icon</p>

  <v-autocomplete
    v-model="example.model"
    :items="example.items"
    icon="b-exclamation-circle"
    style-dropdown="shadow"
    class="w-[420px]"
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
