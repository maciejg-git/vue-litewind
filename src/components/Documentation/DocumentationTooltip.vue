<template>
  <h3>Tooltip</h3>
  <p></p>

  <section>
    <h4>Usage</h4>
    <p>To show tooltip when hovering over html element use the following directive:</p>
    <p class="font-semibold ml-4">
      v-tooltip.modifier1.modifier2="'Tooltip text' or function that returns tooltip
      text"
    </p>
    <p>Modifiers can be in any order.</p>
  </section>

  <section>
    <h4>Reference</h4>
    <p></p>
    <v-table
      :items="reference"
      :definition="referenceDefinition"
      style-table="fixed"
      style-header-cell="bordered"
      style-cell="bordered"
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
      style-table="fixed"
      style-header-cell="bordered"
      style-cell="bordered"
    >
      <template #cell:description="{ value }"
        ><span v-html="value"></span
      ></template>
    </v-table>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-tooltip></example-tooltip>
    </div>
    <v-code :code="exampleTooltipCode" template language="html"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleTooltip from "./examples/ExampleTooltip.vue"
import exampleTooltipCode from "./examples/ExampleTooltip.vue?raw"

export default {
  components: {
    ExampleTooltip,
  },
  setup() {
    let reference = ref([
      {
        modifier: "position",
        default: "bottom-start",
        description:
          "Position of the tooltip. Valid values are the same as placement values in Popperjs",
      },
      {
        modifier: "delay[miliseconds]",
        default: "50",
        description: "Delay before showing and hiding tooltip",
      },
      {
        modifier: "oX[pixels]",
        default: "0",
        description:
          "Offset of tooltip element relative to bound element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
      },
      {
        modifier: "oY[pixels]",
        default: "0",
        description:
          "Offset of tooltip element relative to bound element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
      },
      {
        modifier: "nofade",
        default: "",
        description:
          "Disables fade animation when showing or hiding tooltip",
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
        description:
          "Tooltip content can be a string or a function. Altenatively you can set content using data-tooltip attribute of directive element",
      },
    ]);

    let referenceValueDefinition = ref([
      {
        key: "value",
        label: "Directive value",
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    return {
      reference,
      referenceDefinition,
      referenceValue,
      referenceValueDefinition,
      exampleTooltipCode,
    };
  },
};
</script>

<style scoped>
</style>
