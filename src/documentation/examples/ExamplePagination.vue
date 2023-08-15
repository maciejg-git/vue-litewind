<template>
  <v-pagination
    v-model="example.page"
    :items-count="example.itemsCount"
    :items-per-page="example.itemsPerPage"
    :max-pages="example.maxPages"
  />
  <!-- CUT START -->
  <v-tabs
    base="materialTabs"
    class="mt-10"
  >
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label
            for="model"
            class="font-semibold"
          >
            v-model:
          </label>
          <v-input
            type="text"
            id="model"
            inline
            v-model="example.page"
          ></v-input>
        </div>
        <div>
          <label for="items-count">items-count:</label>
          <v-input
            type="text"
            id="items-count"
            inline
            v-model.number="example.itemsCount"
          ></v-input>
        </div>
        <div>
          <label for="items-per-page">items-per-page:</label>
          <v-input
            type="text"
            id="items-per-page"
            inline
            v-model.number="example.itemsPerPage"
          ></v-input>
        </div>
        <div>
          <label for="max-pages">max-pages:</label>
          <v-input
            type="text"
            id="max-pages"
            inline
            v-model.number="example.maxPages"
          ></v-input>
        </div>
      </div>
    </v-tab>
  </v-tabs>
  <!-- CUT END -->
</template>

<script setup>
import { ref, reactive } from "vue";

let example = reactive({
  page: 1,
  itemsPerPage: 5,
  itemsCount: 50,
  maxPages: 7,
});

let events = ref([]);
</script>
