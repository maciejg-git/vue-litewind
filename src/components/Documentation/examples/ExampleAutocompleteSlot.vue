<template>
  <div class="w-1/2">
    <v-autocomplete
      v-model="example.model"
      :items="example.items"
      :is-loading="example.isLoading"
      item-text="full_name"
      item-value="id"
      :inline="false"
      style-menu="shadow"
      no-filter
      @input:value="query($event)"
    >
      <template #item="{ item, inputValue, isSelected }">
        <div class="flex justify-between">
          <div
            v-html="
              isSelected
                ? item['full_name']
                : highlight(item['full_name'], inputValue)
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
</template>

<script>
import { reactive } from "vue";
import company from "../data/company.json";
import { highlight } from "../../../tools";

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
