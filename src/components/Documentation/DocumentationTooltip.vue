<template>
  <h3>Tooltip</h3>
  <p></p>

  <section>
    <h4>Usage</h4>
    <p>
      To show tooltip when hovering over html element use the following
      directive:
    </p>
    <code class="code-text ml-6">
      v-tooltip.modifier1.modifier2='Tooltip text'
    </code>
    <p>
      Tooltip text can be function:
    </p>
    <code class="code-text ml-6">
      v-tooltip.modifier1.modifier2='() => "Tooltip text"'
    </code>
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
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <p class="my-6">Default tooltip:</p>
      <example-tooltip-simple></example-tooltip-simple>
    </div>
    <v-code :code="exampleTooltipSimpleCode" template language="html"></v-code>

    <div class="example">
      <p class="my-6">Tooltip placement:</p>
      <example-tooltip-placement></example-tooltip-placement>
    </div>
    <v-code :code="exampleTooltipPlacementCode" template language="html"></v-code>

    <div class="example">
      <p class="my-6">Tooltip delay:</p>
      <example-tooltip-delay></example-tooltip-delay>
    </div>
    <v-code :code="exampleTooltipDelayCode" template language="html"></v-code>

    <div class="example">
      <p class="my-6">Tooltip content source:</p>
      <example-tooltip-content></example-tooltip-content>
    </div>
    <v-code :code="exampleTooltipContentCode" template language="html"></v-code>

    <div class="example">
      <p class="my-6">Tooltip animation:</p>
      <example-tooltip-animation></example-tooltip-animation>
    </div>
    <v-code :code="exampleTooltipAnimationCode" template language="html"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import exampleTooltipSimpleCode from "./examples/ExampleTooltipSimple.vue?raw";
import exampleTooltipPlacementCode from "./examples/ExampleTooltipPlacement.vue?raw";
import exampleTooltipDelayCode from "./examples/ExampleTooltipDelay.vue?raw";
import exampleTooltipContentCode from "./examples/ExampleTooltipContent.vue?raw";
import exampleTooltipAnimationCode from "./examples/ExampleTooltipAnimation.vue?raw";

export default {
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
        description: "Disables fade animation when showing or hiding tooltip",
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
      exampleTooltipSimpleCode,
      exampleTooltipPlacementCode,
      exampleTooltipDelayCode,
      exampleTooltipContentCode,
      exampleTooltipAnimationCode,
    };
  },
};
</script>

<style scoped></style>
