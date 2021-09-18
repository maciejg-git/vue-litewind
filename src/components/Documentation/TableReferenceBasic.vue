<template>
  <v-table
    style-table="fixed"
    style-header-cell="bordered"
    style-cell="bordered"
    :definition="definition"
    class="min-w-full"
  >
    <template #cell:description="{ value }">
      <span v-html="value"></span>
    </template>
  </v-table>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let definition = ref([
      {
        key: "prop",
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    return {
      definition,
    };
  },
};
</script>
