<template>
  <div class="flex items-center">
    <div class="w-1/2">
      <v-autocomplete
        v-model="example.model"
        :items="example.items"
        :is-loading="example.isLoading"
        item-text="full_name"
        item-value="id"
        no-filter
        @input:value="query($event)"
      >
        <template #menu-item="{ item, isSelected, highlight }">
          <div class="flex justify-between">
            <div
              v-html="
                isSelected ? item['full_name'] : highlight(item['full_name'])
              "
            ></div>
            <div class="text-xs">{{ item.department }}</div>
          </div>
          <span class="text-sm font-semibold">
            {{ item.title }}
          </span>
        </template>
      </v-autocomplete>
    </div>
    <div class="ml-10 w-1/2">
      <span class="font-semibold">v-model:</span>
      {{ example.model }}
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import company from "../example-data/company.json";

let example = reactive({
  model: "",
  items: [],
  isLoading: false,
});

let query = (q) => {
  if (q === "") return;
  example.isLoading = true;
  setTimeout(() => {
    example.items = company.filter((e) => {
      return (
        (e["full_name"] || "").toLowerCase().indexOf((q || "").toLowerCase()) >
        -1
      );
    });
    example.isLoading = false;
  }, 500);
};
</script>
