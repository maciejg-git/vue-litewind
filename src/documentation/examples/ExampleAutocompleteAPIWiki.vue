<template>
  <div class="flex items-center">
    <div class="w-1/2">
      <v-autocomplete
        v-model="example.model"
        no-filter
        item-text="title"
        item-value="pageid"
        :items="example.items"
        :state="example.state"
        :is-loading="example.isLoading"
        :offset-y="0"
        :input="{ base: 'underlinedInput' }"
        @input:value="debouncedQuery($event)"
      ></v-autocomplete>
    </div>
    <div class="ml-10">
      <span class="font-semibold">v-model:</span>
      {{ example.model }}
    </div>
  </div>

  <v-card
    v-if="current"
    mod-card="shape:square border:borderless"
    class="p-4 mt-6"
  >
    <ul>
      <li>
        <span class="font-semibold">
          {{ current.title }}
        </span>
      </li>
      <li class="my-4">
        <a
          :href="`https://en.wikipedia.org/?curid=${current.pageid}`"
          class="link"
        >
          {{ `https://en.wikipedia.org/?curid=${current.pageid}` }}
        </a>
      </li>
    </ul>
    <iframe
      v-if="current"
      :src="`https://en.wikipedia.org/?curid=${current.pageid}`"
      frameborder="0"
      class="w-full h-[600px]"
    ></iframe>
  </v-card>
</template>

<script setup>
import { reactive, computed } from "vue";
import { debounce } from "../../tools.js";

let example = reactive({
  model: "",
  items: [],
});

const urlWiki =
  "https://en.wikipedia.org/w/api.php?action=query&format=json&list=prefixsearch&formatversion=2&origin=*&pssearch=";

let current = computed(() => {
  return example.items.find((i) => i.pageid === example.model);
});

let query = (q) => {
  if (q === "") return example.items;

  example.isLoading = true;

  fetch(`${urlWiki}${q}`)
    .then((response) => response.json())
    .then((data) => {
      example.items = data.query.prefixsearch;
    })
    .finally(() => {
      example.isLoading = false;
    });
};

let debouncedQuery = debounce(query, 300);
</script>
