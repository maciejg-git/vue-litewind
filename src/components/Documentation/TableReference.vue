<template>
  <v-table
    style-table="fixed"
    style-header-cell="bordered"
    style-cell="bordered"
    :definition="definition"
    class="min-w-full"
  >
    <template #cell:type="{ value }">
      <div class="space-y-1">
        <div v-for="v in value">
          <code class="code-word">
            {{ v }}
          </code>
        </div>
      </div>
    </template>
    <template #cell:default="{ value }">
      <code class="text-sm">{{ value }}</code>
    </template>
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
        sortable: true,
        class: () => "whitespace-nowrap",
      },
      {
        key: "type",
      },
      {
        key: "default",
      },
      {
        key: "description",
      },
    ]);
    
    return {
      definition
    }
  },
}
</script>
