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
        :inline="false"
        :is-loading="example.isLoading"
        style-menu="shadow"
        @input:value="debouncedQuery($event)"
        v-on="handleExampleEvents"
        autocomplete
      ></v-select>
    </div>
    <div class="ml-10">
      <span class="font-semibold">v-model:</span>
      {{ example.model }}
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { debounce } from "../../tools.js"

export default {
  components: {},
  setup() {
    let example = reactive({
      model: [],
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
            i.fullTitle = `${i.title} - ${i.authors
              .map((i) => i.name)
              .join(", ")}`;
            return i;
          });
        })
        .finally(() => {
          example.isLoading = false;
        });
    };

    let debouncedQuery = debounce(query, 300);

    let events = ref([]);

    let handleExampleEvents = {
      ["update:page"]: (event) =>
        events.value.unshift({ ev: "update:page", data: event }),
      ["state:focus"]: (event) =>
        events.value.unshift({ ev: "state:focus", data: event }),
      ["state:opened"]: (event) =>
        events.value.unshift({ ev: "state:opened", data: event }),
      ["state:closed"]: (event) =>
        events.value.unshift({ ev: "state:closed", data: event }),
      ["input:value"]: (event) =>
        events.value.unshift({ ev: "input:value", data: event }),
    };

    return {
      example,
      query,
      events,
      handleExampleEvents,
      debounce,
      debouncedQuery,
    };
  },
};
</script>
