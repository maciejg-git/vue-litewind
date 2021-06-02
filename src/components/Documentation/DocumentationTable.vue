<template>
  <h3>Table</h3>
  <p>Table component</p>

  <section>
    <h5>Reference</h5>
    <p></p>
    <v-table
      :items="reference"
      :definition="referenceDefinition"
      table="default fixed"
      header-cell="default bordered"
      cell="default bordered"
    >
      <template #cell:type="{ value }"
        ><code class="code-word">{{
          value
        }}</code></template
      >
      <template #cell:description="{ value }"
        ><span v-html="value"></span
      ></template>
    </v-table>
  </section>

  <!-- <section> -->
  <!--   <h5>Reference</h5> -->
  <!--   <p></p> -->
  <!--   <v&#45;table :items="reference" :definition="referenceDefinition" small> -->
  <!--     <template #cell:type="{ value }" -->
  <!--       ><code>{{ value }}</code></template -->
  <!--     > -->
  <!--     <template #cell:description="{ value, item }"> -->
  <!--       <span v&#45;html="value"></span> -->
  <!--     </template> -->
  <!--   </v&#45;table> -->
  <!-- </section> -->

  <section>
    <h5>Definition</h5>
    <span class="fw-bold">Type</span>: <code>Array</code>
    <p>
      Table definition is an optional <code>Array</code> of <code>Objects</code> that defines look and behavior of the table. Each object represents one column.
    </p>
    <pre>
      <code>
{{`let definition = ref([
  {
    key: "id",
    class: (k, v, i) => v >= 5 ? 'bg-success' : ''
  },
  {
    key: "first_name",
    sortable: true,
  },
  {
    key: "city",
    visible: false,
  },
  {
    key: "email",
    sortable: true,
  },
  {
    key: "country",
  },
  {
    key: "details"
  },
]);`}}
    </code>
  </pre>
        <p>
        In the above example:
        <ul>
          <li>
            <span class="font-bold">key</span>: key is either existing property of data record or new property. New properties apear as additional columns and their content can be set either by use of functions or slots.
          </li>
        <li><span class="font-bold">label</span>: sets label for this column. If not present label is the same as key converted to Header Case (String, optional, default: undefined)</li>
        <li><span class="font-bold">sortable</span>: enables sorting column (Boolean, optional, default: false) </li>
        <li><span class="font-bold">filterable</span>: enables filtering content of column  (Boolean, optional, default: false))</li>
        <li><span class="font-bold">visible</span>: toggles visiblity of columns  (Boolean, optional, default: false)</li>
        <li><span class="font-bold">class</span>: function that should return string of space separated classes to apply to cell, takes 3 arguments: key, value and item  (Function, optional, default: undefined)</li>
        <li><span class="font-bold">f</span>: value returned by this function is set as content of the cell, takes 3 arguments: key, value and item  (Function, optional, default: undefined)</li>
        <li><span class="font-bold">filterByFunction</span>: if true filter content of column using function f. (Function, optional, default: undefined)</li>
        <li><span class="font-bold">sortByFunction</span>: if true sort content of column using function f. (Function, optional, default: undefined)</li>
        </ul>
        </p>
  </section>

  <section>
    <h5>Example</h5>
    <span class="fw-bold">Type</span>: <code>Number</code>
    <p>
    </p>
    <div class="example">
      <input
        type="text"
        placeholder="Filter"
        v-model="filter.filter"
        class="form-control w-25"
      />
      <v-table
        :items="dataLong"
        :definition="definition"
        :filter="filter.filter"
        :page="pagination.page"
        :items-per-page="pagination.itemsPerPage"
        @update:filtered-count="pagination.itemsCount = $event"
      ></v-table>
      <v-pagination
        v-model="pagination.page"
        :items-count="pagination.itemsCount"
        :items-per-page="pagination.itemsPerPage"
        icons
      ></v-pagination>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h5>Transition</h5>
    <span class="fw-bold">Type</span>: <code>String</code>
    <p></p>
    <div class="example">
      <input
        type="text"
        placeholder="Filter"
        v-model="filter.transition"
        class="form-control w-25"
      />
      <div class="my-3">
        <div class="form-check form-check-inline">
          <input
            v-model="transition"
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="fade-slide"
          />
          <label class="form-check-label" for="inlineRadio1">fade-slide</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            v-model="transition"
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value=""
          />
          <label class="form-check-label" for="inlineRadio2"
            >no transition</label
          >
        </div>
      </div>
      <v-table
        :items="data"
        :definition="definition"
        :filter="filter.transition"
        :transition="transition"
      ></v-table>
    </div>
    <pre>
      <code>
{{``}}
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import vTable from "../vTable.vue";

import vPagination from "../vPagination.vue";
import vButton from "../vButton.vue";
import vBadge from "../vBadge.vue";

import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import dataJSON from "../../MOCK_DATA (1).json";

export default {
  components: {
    vTable,
    vPagination,
    vButton,
    vBadge,
  },
  setup(props) {
    let dataSmall = ref(dataJSON.slice(0, 5));
    let data = ref(dataJSON.slice(0, 10));
    let dataLong = ref(dataJSON.slice(0, 60));
    let definition = ref([
      {
        key: "id",
      },
      {
        key: "first_name",
        // sortable: true,
      },
      {
        key: "last_name",
      },
      {
        key: "email",
        // sortable: true,
      },
      {
        key: "city",
        // visible: false,
      },
      {
        key: "country",
      },
      // {
      //   key: "item_city"
      // },
    ]);

    let filter = reactive({
      filter: "",
      transition: "",
    });

    let visualProps = reactive({
      striped: false,
      hover: false,
      bordered: false,
      borderless: false,
      small: false,
      headerDark: false,
      headerLight: false,
      captionTop: false,
    });

    let page = ref(1);
    let itemsPerPage = ref(10);
    let transition = ref("fade-slide");
    let pagination = reactive({
      page: 1,
      itemsCount: 0,
      itemsPerPage: 10,
    });

    let reference = ref([
      {
        prop: "items",
        type: "Array",
        description:
          "Data to display in table. Each element of Array is an Object. Single Object is one record (row) of data.",
      },
      {
        prop: "definition",
        type: "Array",
        description: `Table definition is an optional <code>Array</code> of <code>Objects</code> that defines look and behavior of the table.`,
      },
      {
        prop: "filter",
        type: "String",
        description: "String to filter array content.",
      },
      {
        prop: "locale",
        type: "String",
        description: "Locale used for sorting.",
      },
      {
        prop: "name",
        type: "String",
        description: "Used only to select non default styles defined in styles.js",
      },
      {
        prop: "busy",
        type: "Boolean",
        description: "When true renders table in busy (faded) state.",
      },
      {
        prop: "selection-mode",
        type: "String",
        description: "Valid values are single (allows selection single row only), multiple (allows multiple rows to be selected) or empty string (disables selection).",
      },
      {
        prop: "page",
        type: "Number",
        description: "Current page number.",
      },
      {
        prop: "items-per-page",
        type: "Number",
        description: "Number of records (rows) on single page.",
      },
      {
        prop: "caption-top",
        type: "Boolean",
        description:
          "Display caption on top. Set caption text in caption slot.",
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
        class: () => "whitespace-nowrap",
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
      dataSmall,
      data,
      dataLong,
      definition,
      reference,
      referenceDefinition,
      filter,
      visualProps,
      transition,
      pagination,
    };
  },
};
</script>

<style scoped>
h5 {
  @apply text-xl;
  @apply font-semibold;
}
h3 {
  @apply text-3xl;
  @apply font-semibold;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 2em;
}
p {
  margin-top: 1em;
}
.nowrap {
  white-space: nowrap;
}
.example {
  margin-top: 2em;
}
.code-word {
  @apply text-sm bg-indigo-200 rounded p-1;
}
</style>
