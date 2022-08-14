<template>
  <h3>Table</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Events</h6>
    <p></p>
    <table-reference-basic :items="events" reference="event"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots" reference="slot"></table-reference-basic>
  </section>

  <section>
    <h4>Prop: definition</h4>
    <span class="font-bold">Type</span>
    :
    <code class="code-word">Array</code>
    <p>
      Table definition is an optional
      <code class="code-text">Array</code>
      of
      <code class="code-text">Objects</code>
      that defines columns of the table. Each object represents one column, has
      one required, unique key property and number of optional properties. If
      definition is not provided component makes one using first record of data.
      This may be enough for simple tables however to use features like sorting,
      filtering etc you need to provide definition array.
    </p>
    <v-code language="javascript">
{{ `let definition: ref([
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
]) `}}
    </v-code>
    <v-table
      :items="referenceProp"
      :definition="referencePropDefinition"
      style-table="fixed"
      style-header-cell="bordered"
      style-cell="bordered"
    >
      <template #cell:type="{ value }">
        <div class="space-y-1">
          <code v-for="v in value" class="code-word">
            {{ v }}
          </code>
        </div>
      </template>
      <template #cell:default="{ value }">
        <code class="text-sm">{{ value }}</code>
      </template>
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>
  </section>

  <section>
    <h4>Example - simple table</h4>
    <div class="example">
      <example-table-simple></example-table-simple>
    </div>
    <v-code :code="exampleTableSimpleCode" template language="html"></v-code>
    <v-code :code="exampleTableSimpleCode" script language="js"></v-code>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-table></example-table>
    </div>
    <v-code :code="exampleTableCode" template language="html"></v-code>
    <v-code :code="exampleTableCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import exampleTableCode from "./examples/ExampleTable.vue?raw"
import exampleTableSimpleCode from "./examples/ExampleTableSimple.vue?raw"
import { styleProps } from "./shared-props"

export default {
  setup() {
    let reference = ref([
      {
        prop: "items",
        type: ["Array"],
        default: "undefined",
        description:
          "Data to display in table. Each element of Array is an Object. Single Object is one record (row) of data",
      },
      {
        prop: "definition",
        type: ["Array"],
        default: "undefined",
        description: `Table definition is an optional <code class='code-text'>Array</code> of <code class='code-text'>Objects</code> that defines look and behavior of the table.`,
      },
      {
        prop: "primary-key",
        type: ["String"],
        default: "undefined",
        description: `This props should be name of the property that is unique for every record. It is used as value for :key attribute`,
      },
      {
        prop: "filter",
        type: ["String"],
        default: "empty string",
        description:
          "Use this String to filter items. Filtering always emits <code class='code-word'>update:page</code> with value 1 and resets any active selection",
      },
      {
        colspan: true,
        name: "table",
      },
      {
        prop: "locale",
        type: ["String"],
        default: "'en-GB'",
        description: "Locale used to compare and sort strings",
      },
      {
        prop: "busy",
        type: ["Boolean"],
        default: "false",
        description:
          "When true renders table in busy (faded) state and disables all pointer events",
      },
      {
        prop: "selection-mode",
        type: ["String"],
        default: "empty string",
        description:
          "Enables or disables selection of rows. Valid values are 'single' (allows selection of single row only), 'multiple' (allows multiple rows to be selected) or empty string (disables selection). After new row is selected or unselected event <code class='code-word'>input:selection</code> is emmited that conatins array of all selected records. <span class='font-semibold'>Filtering</span>, <span class='font-semibold'>sorting</span>, <span class='font-semibold'>changing current page</span> or <span class='font-semibold'>modifying selection-mode prop</span> resets current selection by emmiting empty array",
      },
      {
        prop: "page",
        type: ["v-model", "Number"],
        default: "1",
        description:
          "Current page number. Changing page resets current selection",
      },
      {
        prop: "items-per-page",
        type: ["Number"],
        default: "0",
        description:
          "Number of records (rows) on single page. Setting it to 0 disables pagination",
      },
      {
        prop: "caption-top",
        type: ["Boolean"],
        default: "false",
        description: "If true display caption on top",
      },
      {
        prop: "empty-text",
        type: ["String"],
        default: "'Empty table'",
        description: "Text displayed if table is empty",
      },
      {
        prop: "empty-filtered-text",
        type: ["String"],
        default: "'No records for current filter'",
        description:
          "Text displayed if table is empty after filtering out all items",
      },
      ...styleProps(),
    ]);

    let styles = ref([
      {
        prop: "style-table",
        description: "Main table element",
      },
      {
        prop: "style-header-row",
        description: "Header row",
      },
      {
        prop: "style-header-cell",
        description: "Header cell",
      },
      {
        prop: "style-row",
        description: "Table row",
      },
      {
        prop: "style-cell",
        description: "Table cell",
      },
      {
        prop: "style-selected",
        description: "Selected table cell",
      },
      {
        prop: "style-caption",
        description: "Table caption.",
      },
    ]);

    let events = ref([
      {
        event: "update:page",
        description: "Emmited after filtering. Useful for updating pagination",
      },
      {
        event: "update:filtered-count",
        description: "Emmited after filtering. Useful for updating pagination",
      },
      {
        event: "input:selection",
        description:
          "Emmited after selecting rows. Event data contains array of selected records",
      },
    ]);

    let slots = ref([
      {
        slot: "cell:key",
        description:
          "Slot for cell content. Useful for adding some html formatting, transforming value etc. Key is one of the keys of data record or additional key from definition array<p class='mt-4'>Slot props: <code class='code-word'>value</code>, <code class='code-word'>item</code></p>",
      },
      {
        slot: "caption",
        description:
          "Slot for caption text. Position caption using caption-top prop",
      },
      {
        slot: "busy",
        description:
          "Content of this slot replaces data records if table is busy",
      },
      {
        slot: "empty-table-message",
        description:
          "Slot for custom empty table message when item prop is empty table",
      },
      {
        slot: "empty-filtered-table-message",
        description:
          "Slot for custom empty filtered table message when table is empty after filtering",
      },
    ]);

    let referenceProp = ref([
      {
        prop: "key",
        type: ["String"],
        default: "undefined",
        description:
          "<span class='font-semibold'>(required)</span> key is one of the properties of data from items prop or a new key. New keys apear as additional columns and their content can be set using slot or function f",
      },
      {
        prop: "label",
        type: ["String"],
        default: "undefined",
        description:
          "Sets label for this column. If not present label is the same as key converted to Header Case",
      },
      {
        prop: "sortable",
        type: ["Boolean"],
        default: "false",
        description:
          "enables sorting of the column. By default records are sorted as strings and using locale prop to compare values. Number and dates are sorted as numbers and dates. <code class='code-text'>null</code>,<code class='code-text'>undefined</code> and <code class='code-text'>NaN</code> values are always first when sorting in ascending direction",
      },
      {
        prop: "filterable",
        type: ["Boolean"],
        default: "true",
        description:
          "enables filtering of the column. After filtering following actions happens: event <span class='code-word'>update:filtered-count</span> is emmited, event <span class='code-word'>update:page</span> is emmited with value 1 and current selection is cleared by emmiting <span class='code-word'>input:selection</span> event with empty array",
      },
      {
        prop: "visible",
        type: ["Boolean"],
        default: "true",
        description: "toggles visiblity of the column",
      },
      {
        prop: "class",
        type: ["Function"],
        default: "undefined",
        description:
          "function that should return string of classes to apply to each cell in column. Takes 3 arguments: <code class='code-text'>key</code>, <code class='code-text'>value</code> and <code class='code-text'>item</code>",
      },
      {
        prop: "f",
        type: ["Function"],
        default: "undefined",
        description:
          "if defined this function is called for every cell in this column and the return value is set as content of the cell. Takes 3 arguments: <code class='code-text'>key</code>, <code class='code-text'>value</code> and <code class='code-text'>item</code>. This function cannot be used to add html to cell content",
      },
      {
        prop: "filterByFunction",
        type: ["Boolean"],
        default: "true",
        description:
          "if true filter content of column using value from function f",
      },
      {
        prop: "sortByFunction",
        type: ["Boolean"],
        default: "true",
        description:
          "if true sort content of column using value returned from function f",
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
      styles,
      events,
      slots,
      referenceProp,
      referencePropDefinition,
      exampleTableCode,
      exampleTableSimpleCode,
    };
  },
};
</script>

<style scoped>
</style>
