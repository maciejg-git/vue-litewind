<template>
  <h3>Tooltip</h3>

  <section>
    <h4 id="TooltipReference">Tooltip options reference</h4>
    <table-reference :items="reference"></table-reference>
  </section>

  <tooltip-md></tooltip-md>
</template>

<script setup>
import { ref } from "vue";
import tooltipMd from "./tooltip.md"

let reference = ref([
  {
    prop: "placement",
    type: ["String"],
    default: "'bottom'",
    description:
      "Position of the tooltip. Valid values are the same as placement values in FloatingUI",
  },
  {
    prop: "autoPlacement",
    type: ["Boolean"],
    default: false,
    description:
      "Calculates best placement for tooltip based on available space.",
  },
  {
    prop: "flip",
    type: ["Boolean"],
    default: true,
    description:
      "Changes the placement of the tooltip in order to keep it in view",
  },
  {
    prop: "delay",
    type: ["Number"],
    default: "50",
    description: "Delay before showing and hiding tooltip",
  },
  {
    prop: "offsetX",
    type: ["Number"],
    default: "0",
    description: "Offset of tooltip element relative to bound element.",
  },
  {
    prop: "offsetY",
    type: ["Number"],
    default: "0",
    description: "Offset of tooltip element relative to bound element.",
  },
  {
    prop: "transition",
    type: ["String"],
    default: "fade",
    description:
      "Use animation when showing or hiding tooltip. Valid values are: 'fade', 'scale-fade' or empty string",
  },
  {
    prop: "text",
    type: ["String", "Function"],
    default: "undefined",
    description:
      "Defines text to display inside tooltip. If text is `undefined` then `data-title` attribute of reference element is used as content for tooltip",
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
</script>
