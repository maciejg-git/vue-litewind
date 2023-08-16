<template>
  <div class="flex flex-col md:flex-row md:items-center">
    <div class="w-full md:w-1/2">
      <v-autocomplete
        v-model="example.model"
        no-filter
        multiple
        :items="example.items"
        :is-loading="example.isLoading"
        @input:value="query($event)"
      >
        <template #selected-item="{ item }">
          <v-chip
            class="my-1 mr-2"
            @click:close-button="remove(item.value)"
          >
            {{ item.text }}
          </v-chip>
        </template>
      </v-autocomplete>
    </div>
    <div class="w-full md:w-1/2 md:ml-10 mt-6 md:mt-0">
      <span class="font-semibold">v-model:</span>
      {{ example.model }}
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { states } from "../example-data/data.js";

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
      return (e.text || "").toLowerCase().indexOf((q || "").toLowerCase()) > -1;
    });
    example.isLoading = false;
  }, 500);
};

let remove = (item) => {
  const index = example.model.indexOf(item);
  if (index >= 0) example.model.splice(index, 1);
};
</script>
