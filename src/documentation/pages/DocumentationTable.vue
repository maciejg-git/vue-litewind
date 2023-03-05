<template>
  <h3>Table</h3>
  <links-github-header component="vTable" />

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

    <h6>Events</h6>
    <table-reference-basic
      :items="reference.events"
      reference="event"
    />

    <h6>Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <section>
    <h4 class="mb-2">Prop: definition</h4>
    <span class="font-bold">Type</span>
    :
    <code class="code-word">Array</code>
    <p>
      Table definition is an optional
      <code class="code-text">array</code>
      of
      <code class="code-text">objects</code>
      that defines columns of the table. Each object represents one column, has
      one required, unique
      <code class="code-text">key</code>
      property and number of optional properties. If definition is not provided
      component makes one using first record of data. This may be enough for
      simple tables however to use features like sorting, filtering etc you need
      to provide definition array.
    </p>
    <v-code language="javascript">
      {{
        `let definition: ref([
  {
    key: "id",
    visible: false,
  },
  {
    key: "first_name",
    sortable: true,
  },
  {
    key: "last_name",
    sortable: true,
  },
  {
    key: "email",
    sortable: true,
  },
  {
    key: "city",
    sortable: true,
  },
  {
    key: "country",
    sortable: true,
    class: (k, v) => (v == "ID" ? "bg-red-50" : ""),
  },
  {
    key: "edit",
  },
]) `
      }}
    </v-code>
    <table-reference
      :items="referenceProp"
      :definition="referencePropDefinition"
    />
  </section>


  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleTable"></example>
    </div>
  </section>

  <section>
    <h4>Example - colspan item property</h4>
    <p>
      Item can have special property
      <code class="code-text">colspan: {}</code>
      . Properties of this object are rendered as full row below item. To render
      them use
      <code class="code-text">colspan</code>
      slot.
    </p>
    <div class="example">
      <example name="ExampleTableColspan"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vTable.json";

export default {
  setup() {
    let reference = reactive(componentDocumentation);

    let referenceProp = ref([
      {
        prop: "key",
        type: ["String"],
        default: "undefined",
        description:
          "<span class='font-semibold'>(required)</span> `key` is one of the properties of data from `items` prop or a new `key`. New `keys` apear as additional columns and their content can be set using slot or function `f`",
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
          "Enables filtering of the column. After filtering following actions happen: event @update:filtered-count is emmited, event @update:page is emmited with value `1` and current selection is cleared by emmiting @input:selection event with empty array",
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

    let referencePropDefinition = ref([
      {
        key: "prop",
        label: "Definition property",
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
      reference,
      referenceProp,
      referencePropDefinition,
    };
  },
};
</script>

<style scoped></style>
