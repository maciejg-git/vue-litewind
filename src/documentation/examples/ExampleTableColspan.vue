<template>
  <v-table
    :items="example.data"
    :primary-key="example.primaryKey"
    class="w-full"
  >
    <template #colspan="{ item }">
      <div class="bg-secondary-200 dark:bg-dark-700 p-2 px-4 m-2">
        <div>
          <span class="font-semibold">First name:</span>
          {{ item["first_name"] }}
        </div>
        <div>
          <span class="font-semibold">City:</span>
          {{ item["city"] }}
        </div>
      </div>
    </template>
  </v-table>
</template>

<script setup>
import { reactive } from "vue";
import data from "../example-data/company-simple.json";

let example = reactive({
  data: data.slice(0, 5),
  primaryKey: "id",
});

example.data = example.data.map((i) => {
  return { colspan: { ...i }, ...i };
});
</script>
