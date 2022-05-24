<template>
  <v-autocomplete
    v-model="example.model"
    v-model:input-value="example.inputValue"
    :items="example.items"
    :is-loading="example.isLoading"
    item-text="last_name"
    item-value="last_name"
    style-menu="shadow"
    no-filter
    @input:value="query($event)"
    class="w-[420px]"
  >
    <template #item="{ text, item, value, inputValue, highlightMatch }">
      <div class="flex justify-between">
        <div
          v-html="
            item['first_name'] +
            ' ' +
            highlightMatch(item['last_name'], inputValue)
          "
        ></div>
        <div class="text-xs">{{ item.department }}</div>
      </div>
      <span class="text-text-400 dark:text-text-400 text-sm font-semibold">
        {{ item.title }}
      </span>
    </template>
  </v-autocomplete>
</template>

<script>
import { ref, reactive } from "vue";
import company from "../data/company.json";

export default {
  setup() {
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
            (e["last_name"] || "")
              .toLowerCase()
              .indexOf((q || "").toLowerCase()) > -1
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
