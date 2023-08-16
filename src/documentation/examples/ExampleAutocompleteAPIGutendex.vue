<template>
  <div class="flex items-center">
    <div class="w-1/2">
      <v-select
        v-model="example.model"
        no-filter
        item-text="fullTitle"
        item-value="id"
        :items="example.items"
        :state="example.state"
        :is-loading="example.isLoading"
        @input:value="debouncedQuery($event)"
        autocomplete
      ></v-select>
    </div>
    <div class="ml-10">
      <span class="font-semibold">v-model:</span>
      {{ example.model }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { debounce } from "../../tools.js";

let example = reactive({
  model: "",
  items: [],
});

const url = "https://gutendex.com/books/";

let query = (q) => {
  if (q === "") return example.items;

  example.isLoading = true;

  fetch(`${url}?search=${q}`)
    .then((response) => response.json())
    .then((data) => {
      example.items = data.results.map((i) => {
        i.fullTitle = `${i.title} - ${i.authors.map((i) => i.name).join(", ")}`;
        return i;
      });
    })
    .finally(() => {
      example.isLoading = false;
    });
};

let debouncedQuery = debounce(query, 300);
</script>
