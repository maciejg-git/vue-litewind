<template>
  <div class="w-1/2">
    <v-autocomplete
      v-model="example.model"
      no-filter
      multi-value
      :items="example.items"
      :is-loading="example.isLoading"
      :inline="false"
      style-menu="shadow"
      @input:value="query($event)"
    ></v-autocomplete>
  </div>
</template>

<script>
import { reactive } from "vue";
import { states } from "../data/data.js";

export default {
  components: {},
  setup() {
    let example = reactive({
      model: [],
      items: [],
      isLoading: false,
    });

    let query = (q) => {
      if (q === "") return example.items;
      example.isLoading = true;
      setTimeout(() => {
        example.items = states.filter((e) => {
          return (
            (e.text || "").toLowerCase().indexOf((q || "").toLowerCase()) > -1
          );
        });
        example.isLoading = false;
      }, 500);
    };

    return {
      example,
      query,
    };
  },
};
</script>
