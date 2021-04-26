<template>
  <h3>Table</h3>
  <p>Table component</p>

  <section>
    <h5>Example</h5>
    <p></p>
    <v-table :items="dataSmall" :definition="definition"></v-table>
    <pre>
      <code>
{{`<v-table 
  :items="data" 
  :definition="definition"
>
</v-table>`}}
      </code>
    </pre>
  </section>

  <section>
    <h5>Reference</h5>
    <p></p>
    <v-table :items="reference" :definition="referenceDefinition">
      <template #cell:type="{ value }"><code class="text-sm bg-gray-100 rounded p-1">{{ value }}</code></template>
      <template #cell:description="{ value }"><span v-html="value"></span></template>
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
    <p>Table definition is an <span class="fw-bold">optional</span> <code>Array</code> of <code>Objects</code> that defines look and behavior of the table. If definition prop is not set compoment internally uses items prop to define shape of table, however more advaced features like sorting, reordering or customized labels will not be available. Each <code>Object</code> of definition <code>Array</code> has <code>key</code> property and any of optional properties to customize column. Key is either existing property of data record or new property. New properties apear as additional columns and their content can be set either by use of functions or slots. Keys may apear in any order that defines order of columns in table. Optional properties are: <br>
        <span class='fw-bold'>sortable</span>: allows sorting by this key. Default: false<br>
        <span class='fw-bold'>filterable</span>: allows filtering by this key. Default: true<br>
        <span class='fw-bold'>visible</span>: sets visibility of column.  Default: true<br>
        <span class='fw-bold'>class</span>: user defined function that should return string of space separated classes to apply to cell, takes 3 arguments: key, value and item.<br>
        <span class='fw-bold'>f</span>: value returned by this function is set as content of the cell, takes 3 arguments: key, value and item.</p>
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
  </section>

  <section>
    <h5>Filter</h5>
    <span class="fw-bold">Type</span>: <code>String</code>
    <p></p>
    <div class="example">
    <input type="text" placeholder="Filter" v-model="filter.filter" class="form-control w-25" />
      <v-table :items="data" :definition="definition" :filter="filter.filter"></v-table>
    </div>
    <pre>
      <code>
{{`<input 
  type="text" 
  placeholder="Filter"
  v-model="filter"
  class="form-control w-25"
/>
<v-table
  :items="data"
  :definition="definition" 
  :filter="filter"
>
</v-table>`}}
      </code>
    </pre>
  </section>

  <section>
    <h5>Page, Items-per-page</h5>
    <span class="fw-bold">Type</span>: <code>Number</code>
    <p>Items-per-page prop control number of records displayed per page. Page prop is number of currently displayed page.</p>
    <div class="example">
      <v-table :items="dataLong" :definition="definition" :page="pagination.page" :items-per-page="pagination.itemsPerPage" @update:itemsCount="pagination.itemsCount = $event"></v-table>
      <v-pagination v-model="pagination.page" :items-count="pagination.itemsCount" :items-per-page="pagination.itemsPerPage" :class-wrapper="pagination.wrapper"
        :class-page-active="pagination.active" 
        :class-page="pagination.page"
        :class-next="pagination.next"></v-pagination>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h5>Visual props</h5>
    <span class="fw-bold">Type</span>: <code>Boolean</code>
    <p>Set of visual only props based on Bootstrap table classes.</p>
    <div class="example">
      <div class="mb-3">
        <div class="form-check form-check-inline">
          <input v-model="visualProps.striped" class="form-check-input" type="checkbox" id="striped">
          <label class="form-check-label" for="striped">
            Striped
          </label>
        </div>
        <div class="form-check form-check-inline ms-2">
          <input v-model="visualProps.hover" class="form-check-input" type="checkbox" id="striped">
          <label class="form-check-label" for="striped">
            Hover
          </label>
        </div>
        <div class="form-check form-check-inline ms-2">
          <input v-model="visualProps.bordered" class="form-check-input" type="checkbox" id="striped">
          <label class="form-check-label" for="striped">
            Bordered
          </label>
        </div>
        <div class="form-check form-check-inline ms-2">
          <input v-model="visualProps.borderless" class="form-check-input" type="checkbox" id="striped">
          <label class="form-check-label" for="striped">
            Borderless
          </label>
        </div>
        <div class="form-check form-check-inline ms-2">
          <input v-model="visualProps.small" class="form-check-input" type="checkbox" id="striped">
          <label class="form-check-label" for="striped">
            Small
          </label>
        </div>
        <div class="form-check form-check-inline ms-2">
          <input v-model="visualProps.headerDark" class="form-check-input" type="checkbox" id="striped">
          <label class="form-check-label" for="striped">
            Header dark
          </label>
        </div>
        <div class="form-check form-check-inline ms-2">
          <input v-model="visualProps.headerLight" class="form-check-input" type="checkbox" id="striped">
          <label class="form-check-label" for="striped">
            Header light
          </label>
        </div>
        <div class="form-check form-check-inline ms-2">
          <input v-model="visualProps.captionTop" class="form-check-input" type="checkbox" id="striped">
          <label class="form-check-label" for="striped">
            Caption on top
          </label>
        </div>
      </div>
      <v-table 
        :items="dataSmall" 
        :definition="definition"
        :striped="visualProps.striped"
        :hover-row="visualProps.hover"
        :bordered="visualProps.bordered"
        :borderless="visualProps.borderless"
        :small="visualProps.small"
        :header-dark="visualProps.headerLight"
        :header-light="visualProps.headerDark"
        :caption-top="visualProps.captionTop"
      >
        <template #caption>Example table</template>
      </v-table>
    </div>
  </section>

  <section>
    <h5>Transition</h5>
    <span class="fw-bold">Type</span>: <code>String</code>
    <p></p>
    <div class="example">
      <input type="text" placeholder="Filter" v-model="filter.transition" class="form-control w-25" />
      <div class="my-3">
        <div class="form-check form-check-inline">
          <input v-model="transition" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="fade-slide">
          <label class="form-check-label" for="inlineRadio1">fade-slide</label>
        </div>
        <div class="form-check form-check-inline">
          <input v-model="transition" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="">
          <label class="form-check-label" for="inlineRadio2">no transition</label>
        </div>
      </div>
      <v-table :items="data" :definition="definition" :filter="filter.transition" :transition="transition"></v-table>
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

import vPagination from "../vPagination.vue"
import vButton from "../vButton.vue"

import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import dataJSON from "../../MOCK_DATA (1).json";

export default {
  components: {
    vTable,
    vPagination,
    vButton,
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
        sortable: true,
      },
      {
        key: "last_name",
      },
      {
        key: "email",
        sortable: true,
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
    })

    let page = ref(1);
    let itemsPerPage = ref(10);
    let transition = ref("fade-slide")
    let pagination = reactive({
      page: 1,
      itemsCount: 0,
      itemsPerPage: 10,
    })

    let reference = ref([
      {
        prop: "items",
        type: "Array",
        description: "Data to display in table. Each element of Array is an Object. Single Object is one record (row) of data.",
      },
      {
        prop: "definition",
        type: "Array",
        description:
        `Table definition is an <span class="fw-bold">optional</span> <code>Array</code> of <code>Objects</code> that defines look and behavior of the table.
        Each <code>Object</code> of definition <code>Array</code> has one <code>key</code> property and defines one column of the table. Key is either existing property of data record or new property. New properties apear as additional columns and their content can be set either by use of functions or slots. Objects can have additional properties: <br>
        <span class='fw-bold'>sortable</span>: allows sorting by this key. Default: false<br>
        <span class='fw-bold'>filterable</span>: allows filtering by this key. Default: true<br>
        <span class='fw-bold'>visible</span>: sets visibility of column.  Default: true<br>
        <span class='fw-bold'>class</span>: user defined function that should return string of space separated classes to apply to cell, takes 3 arguments: key, value and item.<br>
        <span class='fw-bold'>f</span>: value returned by this function is set as content of the cell, takes 3 arguments: key, value and item.`,
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
        prop: "items-per-page",
        type: "Number",
        description: "Number of records (rows) on single page.",
      },
      {
        prop: "caption-top",
        type: "Boolean",
        description: "Display caption on top. Set caption text in caption slot.",
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
        class: () => 'nowrap',
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
h1, h2, h3, h4, h5, h6 {
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
</style>
