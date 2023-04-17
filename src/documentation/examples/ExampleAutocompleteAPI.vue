<template>
  <div class="flex items-center">
    <div class="w-1/2">
      <v-select
        v-model="example.model"
        no-filter
        item-text="name"
        item-value="changeuuid"
        icon="mdi-radio-tower"
        :items="example.items"
        :state="example.state"
        :is-loading="example.isLoading"
        style-menu="shadow"
        @input:value="debouncedQuery($event)"
        autocomplete
      ></v-select>
    </div>
    <div class="ml-10">
      <span class="font-semibold">v-model:</span>
      {{ example.model }}
    </div>
  </div>

  <v-card
    v-if="current"
    base="flat-card"
    style-card="rounded"
    class="p-4 mt-6"
  >
    <ul>
      <li>
        <span class="font-semibold">
          {{ current.name }}
        </span>
      </li>
      <li>
        {{ current.url }}
      </li>
      <li class="mt-4">
        {{ current.country }}
      </li>
      <li class="mt-4">
        <span class="font-semibold">Tags:</span>
        {{ current.tags || "none" }}
      </li>
    </ul>
  </v-card>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { debounce } from "../../tools.js";

let example = reactive({
  model: "",
  items: [],
});

const urlStations = "http://de1.api.radio-browser.info/json/stations/byname/";

let current = computed(() => {
  return example.items.find((i) => i.changeuuid === example.model);
});

let query = (q) => {
  if (q === "") return example.items;

  example.isLoading = true;

  fetch(`${urlStations}${q}`)
    .then((response) => response.json())
    .then((data) => {
      example.items = data;
    })
    .finally(() => {
      example.isLoading = false;
    });
};

let debouncedQuery = debounce(query, 300);
</script>
