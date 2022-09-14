<template>
  <v-autocomplete
    v-model="example.model"
    v-model:input-value="example.inputValue"
    :items="example.items"
    :is-loading="example.isLoading"
    item-text="full_name"
    item-value="id"
    inline
    style-menu="shadow"
    no-filter
    @input:value="query($event)"
    class="w-[420px]"
  >
    <template #item="{ item, inputValue }">
      <div class="flex justify-between">
        <div v-html="highlight(item['full_name'], inputValue)"></div>
        <div class="text-xs">{{ item.department }}</div>
      </div>
      <span class="text-sm font-semibold text-text-400 dark:text-text-400">
        {{ item.title }}
      </span>
    </template>
  </v-autocomplete>
</template>

<script>
import { reactive } from "vue";
import company from "../data/company.json";
import { highlight } from "../../../tools"

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
            (e["full_name"] || "")
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
      highlight,
    };
  },
};
</script>
