<template>
  <h3>Tooltip</h3>
  <p class="text-xl font-light">Tooltip component</p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <v-table
      :items="reference"
      :definition="referenceDefinition"
      style-table="default fixed"
      style-header-cell="default bordered"
      style-cell="default bordered"
    >
      <template #cell:type="{ value }">
        <code class="code-word mx-1">
          {{ value }}
        </code>
      </template>
      <template #cell:default="{ value }">
        <code class="text-sm">{{ value }}</code>
      </template>
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>

    <p></p>
    <v-table
      :items="referenceValue"
      :definition="referenceValueDefinition"
      style-table="default fixed"
      style-header-cell="default bordered"
      style-cell="default bordered"
    >
      <template #cell:description="{ value }"
        ><span v-html="value"></span
      ></template>
    </v-table>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <v-button v-tooltip.bottom.delay100.oY5="'This is tooltip.'">Hover me</v-button>
      <br>
      <v-button v-tooltip.right.delay100.oY5="'This is tooltip on the right.'">Hover me (tooltip on right)</v-button>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import vTable from "../vTable.vue";
import vButton from "../vButton.vue";
import tooltip from "../../directives/tooltip.js"

import hljs from "highlight.js";
import "highlight.js/styles/default.css";

export default {
  components: {
    vTable,
    vButton,
  },
  directives: {
    tooltip,
  },
  setup(props) {
    let reference = ref([
      {
        modifier: "position",
        default: "bottom-start",
        description:
          "Position of the tooltip. Valid values are the same as placement values in Popperjs",
      },
      {
        modifier: "delay",
        default: "d50",
        description:
          "Delay to wait before showing and hiding tooltip",
      },
      {
        modifier: "vertical offset",
        default: "oX0",
        description:
          "Vertical offset of tooltip element relative to bound element",
      },
      {
        modifier: "horizontal offset",
        default: "oY0",
        description:
          "Horizontal offset of tooltip element relative to bound element",
      },
    ]);

    let referenceDefinition = ref([
      {
        key: "modifier",
        sortable: true,
        class: () => "whitespace-nowrap",
      },
      {
        key: "default",
        class: () => "whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let referenceValue = ref([
      {
        value: "tooltip content",
        description: "Tooltip content can be a html string of a function. Altenatively you can set content in data-tooltip attribute of bound element. If both are present content of tooltip is set by directive value",
      },
    ]);

    let referenceValueDefinition = ref([
      {
        key: "value",
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let example = reactive({

    });

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      referenceDefinition,
      referenceValue,
      referenceValueDefinition,
      example,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
