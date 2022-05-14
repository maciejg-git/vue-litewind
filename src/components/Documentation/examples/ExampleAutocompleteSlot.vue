<template>
  <v-autocomplete
    v-model="example.model"
    v-model:input-value="example.inputValue"
    :items="example.items"
    :is-loading="example.isLoading"
    style-menu="shadow"
    no-filter
    @input:value="query($event)"
    class="w-[420px]"
  >
    <template #item="{ text, item, value, inputValue, highlightMatch }">
      <div class="flex justify-between">
        <div v-html="highlightMatch(text, inputValue)"></div>
        <div>USA</div>
      </div>
      <span class="text-text-400 dark:text-text-400 text-sm font-semibold">
        free
      </span>
    </template>
  </v-autocomplete>
</template>

<script>
import { ref, reactive } from "vue";
import { states } from "../../../const";

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
        example.items = states.filter((e) => {
          return (
            (e.text || "").toLowerCase().indexOf((q || "").toLowerCase()) > -1
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
