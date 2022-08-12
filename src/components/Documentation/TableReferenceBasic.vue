<template>
  <v-table
    style-table="fixed"
    style-header-cell="bordered"
    style-cell="bordered"
    :definition="definition"
    class="min-w-full"
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
        <span v-html="value"></span>
      </slot>
    </template>
  </v-table>
</template>

<script>
import { ref } from "vue";

export default {
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

    return {
      definition,
    };
  },
};
</script>
