<template>
  <div class="mt-6 mb-12">
    <v-table
      style-table="fixed"
      style-header-cell="bordered"
      style-cell="bordered"
      :definition="definition"
      class="min-w-full"
      v-bind="$attrs"
    >
      <template #cell:function="{ value }">
          <code v-html="value"></code>
      </template>
      <template #cell:slot="{ value }">
          <code v-html="value"></code>
      </template>
      <template #cell:event="{ value }">
          <code v-html="value"></code>
      </template>
      <template #cell:prop="{ value }">
          <code v-html="value"></code>
      </template>
      <template #cell:component="{ value }">
          <code v-html="value"></code>
      </template>
      <template #cell:description="{ value, item }">
        <slot :name="'description-' + item.prop" :value="value">
          <span v-html="template(value)"></span>
        </slot>
      </template>
    </v-table>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  inheritAttrs: false,
  props: {
    reference: { type: String, default: "prop" },
  },
  setup(props) {
    let definition = ref([
      {
        key: props.reference,
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let template = (string) => {
      return string.replace(
        new RegExp("('[^']*')|(\\bv-\\w+\\S+)|`([^`]*)`", "ig"),
        `<code class="code-text">$1$2$3</code>`
      ).replace(
        new RegExp("@(\\S*)", "ig"),
        `<code class="code-word">$1</code>`
      );
    };

    return {
      definition,
      template,
    };
  },
};
</script>
