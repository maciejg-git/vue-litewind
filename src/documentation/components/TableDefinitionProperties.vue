<template>
  <table-reference
    class="table-reference"
    :items="referenceProp"
    :filterable="false"
  />
</template>

<script setup>
import { ref, reactive } from "vue";

let referenceProp = ref([
  {
    prop: "key",
    type: ["String"],
    default: "undefined",
    required: true,
    description:
      "`key` is one of the properties of data from `items` prop or a new `key`. New `keys` apear as additional columns and their content can be set using slot or function `f`. This property is required.",
  },
  {
    prop: "label",
    type: ["String"],
    default: "undefined",
    description:
      "Sets label for this column. If not present label is the same as `key` converted to Header Case",
  },
  {
    prop: "sortable",
    type: ["Boolean"],
    default: "false",
    description:
      "Enables sorting of the column. By default records are sorted as `strings` and using `locale` prop to compare values. Numbers and dates are sorted as numbers and dates. `null`, `undefined` and `NaN` values are always first when sorting in ascending direction",
  },
  {
    prop: "filterable",
    type: ["Boolean"],
    default: "true",
    description:
      "Enables filtering of the column. After filtering following actions happen: event `update:filtered-count` is emmited (event data contains number of elements after filtering), event `update:page` is emmited with value `1` (to reset pagination back to first page) and current selection is cleared by emmiting `input:selection` event with an empty array",
  },
  {
    prop: "visible",
    type: ["Boolean"],
    default: "true",
    description: "Toggles visiblity of the column",
  },
  {
    prop: "class",
    type: ["Function"],
    default: "undefined",
    description:
      "Function that should return string of classes to apply to each cell in column. Takes 3 arguments: `key`, `value` and `item`",
  },
  {
    prop: "f",
    type: ["Function"],
    default: "undefined",
    description:
      "If defined this function is called for every cell in this column and the return value is set as content of the cell. Takes 3 arguments: `key`, `value` and `item`. This function cannot be used to add html to cell content",
  },
  {
    prop: "filterByFunction",
    type: ["Boolean"],
    default: "true",
    description:
      "If `true` filter content of column using value from function `f`",
  },
  {
    prop: "sortByFunction",
    type: ["Boolean"],
    default: "true",
    description:
      "If `true` sort content of column using value returned from function `f`",
  },
]);
</script>
