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
        {{ current.tags }}
      </li>
    </ul>
  </v-card>
</template>

<script>
import { ref, reactive, computed } from "vue";
import { debounce } from "../../tools.js";

export default {
  components: {},
  setup() {
    let example = reactive({
      model: [],
      items: [],
    });

    const urlStations =
      "http://de1.api.radio-browser.info/json/stations/byname/";

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
      current,
    };
  },
};
</script>
