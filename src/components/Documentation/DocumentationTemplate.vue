<template>
  <h3>Table</h3>
  <p>Table component</p>

  <section>
    <h5>Example</h5>
    <p></p>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h5>Reference</h5>
    <p></p>
    <v-table :items="reference" :definition="referenceDefinition" small>
      <template #cell:type="{ value }"
        ><code>{{ value }}</code></template
      >
      <template #cell:description="{ value, item }">
        <span v-html="value"></span>
      </template>
    </v-table>
  </section>

  <section>
    <h5>Items</h5>
    <span class="fw-bold">Type</span>: <code>Array</code>
    <p></p>
    <div class="example">
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

import hljs from "highlight.js";
import "highlight.js/styles/default.css";

export default {
  components: {
    vTable,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "items",
        type: "Array",
        description: "Data to display in table.",
      },
      {
        prop: "definition",
        type: "Array",
        description:
          "Table definition is an optional <code>Array</code> of <code>Objects</code> that defines look end behavior of table. Each object has <code>key</code> property and any of optional properties that defines how to display. Key is is either existing property of data record or new property added to table as column. Keys may apear in any order that defines order of columns in table. Optional properties are: <br><span class='fw-bold'>sortable</span>: allows sorting by this key<br><span class='fw-bold'>filterable</span>: allows filtering by this key<br><span class='fw-bold'>visible</span>: sets visibility of column<br><span class='fw-bold'>class</span>: function that return string of classes to apply to cell, takes 3 arguments: current key, current value and current item<br><span class='fw-bold'>f</span>: functions that returns filtered value, takes 3 arguments: current key, current value and current item",
      },
      {
        prop: "filter",
        type: "String",
        description: "String to filter array content.",
      },
      {
        prop: "page",
        type: "Number",
        description: "Current page number.",
      },
      {
        prop: "itemsPerPage",
        type: "Number",
        description: "Number of records (rows) on single page.",
      },
      {
        prop: "striped",
        type: "Boolean",
        description: "Striped array.",
      },
      {
        prop: "hover-row",
        type: "Boolean",
        description: "Hover row array.",
      },
      {
        prop: "bordered",
        type: "Boolean",
        description: "Adds border to table.",
      },
      {
        prop: "borderless",
        type: "Boolean",
        description: "Remove all borders from table.",
      },
      {
        prop: "small",
        type: "Boolean",
        description: "More compact table. Reduces padding.",
      },
      {
        prop: "header-dark",
        type: "Boolean",
        description: "Adds dark style to header.",
      },
      {
        prop: "header-light",
        type: "Boolean",
        description: "Adds light style to header.",
      },
      {
        prop: "caption-top",
        type: "Boolean",
        description: "Caption on top. Set caption content with caption slot.",
      },
      {
        prop: "empty-text",
        type: "String",
        description: "Text displayed if table is empty.",
      },
      {
        prop: "empty-filtered-text",
        type: "String",
        description: "Text displayed if table is empty after filtering.",
      },
      {
        prop: "transition",
        type: "String",
        description:
          "Animation to use for removing and adding records. Allowed values: 'fade-slide' or '' (empty string). <span class='fw-bold'>Default</span>: 'fade-slide'",
      },
    ]);

    let referenceDefinition = ref([
      {
        key: "prop",
        sortable: true,
      },
      {
        key: "type",
        sortable: true,
      },
      {
        key: "description",
      },
    ]);

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      referenceDefinition,
    };
  },
};
</script>

<style scoped>
h1, h2, h3, h4, h5, h6 {
  margin-top: 2em;
}
p {
  margin-top: 1em;
}
.example {
  margin-top: 2em;
}
</style>
