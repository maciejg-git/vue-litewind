<template>
  <div class="mb-12 mt-6">
    <v-table
      style-table="fixed"
      style-header-cell="bordered"
      style-cell="bordered"
      :definition="definition"
      class="min-w-full"
      v-bind="$attrs"
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
        <span v-html="template(value)"></span>
      </template>
      <template #cell:prop="{ value }">
        <code v-html="value"></code>
      </template>
    </v-table>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  inheritAttrs: false,
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

    let template = (string) => {
      return string.replace(
        new RegExp("('[^']*')|(\\bv-\\w+)|`([^`]*)`", "ig"),
        `<code class="code-text">$1$2$3</code>`
      ).replace(
        new RegExp("@(\\S*)", "ig"),
        `<code class="code-word">$1</code>`
      );
    };
    
    return {
      definition,
      template
    }
  },
}
</script>
