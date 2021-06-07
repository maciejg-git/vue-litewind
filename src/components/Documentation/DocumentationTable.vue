<template>
  <h3>Table</h3>
  <p class="text-xl font-light">Table component</p>

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

    <h6>Styling props</h6>
    <p></p>
    <v-table
      :items="referenceStyles"
      :definition="referenceStylesDefinition"
      style-table="default fixed"
      style-header-cell="default bordered"
      style-cell="default bordered"
    >
      <template #cell:description="{ value }"
        ><span v-html="value"></span
      ></template>
    </v-table>

    <h6>Events</h6>
    <p></p>
    <v-table
      :items="referenceEvents"
      :definition="referenceEventsDefinition"
      style-table="default fixed"
      style-header-cell="default bordered"
      style-cell="default bordered"
    >
      <template #cell:description="{ value }"
        ><span v-html="value"></span
      ></template>
    </v-table>

    <h6>Slots</h6>
    <p></p>
    <v-table
      :items="referenceSlots"
      :definition="referenceSlotsDefinition"
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
    <h4>Definition</h4>
    <span class="font-bold">Type</span>: <code class="code-word">Array</code>
    <p>
      Table definition is an optional <code>Array</code> of
      <code>Objects</code> that defines look and behavior of the table. Each
      object represents one column, has one required, unique key property and
      number of optional properties.
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
    <p>Required properties:</p>

    <ul>
      <li>
        <span class="font-bold">key</span>: key is either existing property of
        data record or new property. New properties apear as additional columns
        and their content can be set either by use of functions or slots.
      </li>
    </ul>
    <p>Optional properties:</p>
    <ul>
      <li>
        <span class="font-bold">label</span>: sets label for this column. If not
        present label is the same as key converted to Header Case (String,
        default: undefined)
      </li>
      <li>
        <span class="font-bold">sortable</span>: enables sorting column
        (Boolean, default: false)
      </li>
      <li>
        <span class="font-bold">filterable</span>: enables filtering content of
        column (Boolean, default: false))
      </li>
      <li>
        <span class="font-bold">visible</span>: toggles visiblity of columns
        (Boolean, default: false)
      </li>
      <li>
        <span class="font-bold">class</span>: function that should return string
        of space separated classes to apply to each cell in column. Takes 3
        arguments: key, value and item (Function, default: undefined)
      </li>
      <li>
        <span class="font-bold">f</span>: value returned by this function is
        displayed in the cell. Takes 3 arguments: key, value and item (Function,
        default: undefined)
      </li>
      <li>
        <span class="font-bold">filterByFunction</span>: if true filter content
        of column using value returned from function f. If false use value from
        items prop (Boolean, default: undefined)
      </li>
      <li>
        <span class="font-bold">sortByFunction</span>: if true sort content of
        column using value returned from function f. If false use value from
        items prop (Boolean, default: undefined)
      </li>
    </ul>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <input
        type="text"
        placeholder="Filter"
        v-model="example.filter"
        class="rounded border-gray-300 focus:border-gray-400 focus:ring focus:ring-indigo-200 py-1"
      />
      <v-table
        :items="example.data"
        :definition="definition"
        :filter="example.filter"
        :page="example.page"
        :items-per-page="example.itemsPerPage"
        :busy="example.busy"
        :selectionMode="example.selectionMode"
        :captionTop="!!example.captionTop"
        :transition="example.transition"
        :locale="example.locale"
        @update:filtered-count="example.itemsCount = $event"
        @update:page="example.page = $event"
      >
        <template #cell:edit="{ item }">
          <vButton
            style-button="default tiny noMargin"
            @click.stop="edit(item)"
          >
            edit
          </vButton>
        </template>
        <template #caption> Example </template>
      </v-table>
      <div class="flex justify-between my-5">
        <div>
          <v-pagination
            v-model="example.page"
            :items-count="example.itemsCount"
            :items-per-page="example.itemsPerPage"
            max-pages="7"
            icons
          ></v-pagination>
        </div>
        <div>
          <label for="items-per-page" class="mr-10">Items per page</label>
          <select v-model="example.itemsPerPage" id="items-per-page">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      <hr />
      <div class="mt-5">
        <div class="mb-2">
          <label for="locale">locale: </label>
          <input type="text" id="locale" v-model="example.locale" />
        </div>
        <div class="mb-2">
          <label for="busy">busy: </label>
          <select id="busy" v-model="example.busy">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="selection-mode">selection-mode: </label>
          <select id="selection-mode" v-model="example.selectionMode">
            <option value="single">single</option>
            <option value="multiple">multiple</option>
            <option value="">empty string (selection disabled)</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="caption-top">caption-top: </label>
          <select id="caption-top" v-model="example.captionTop">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="transition">transition: </label>
          <select id="transition" v-model="example.transition">
            <option value="fade-slide">fade-slide</option>
            <option value="">empty string (no transition)</option>
          </select>
        </div>
      </div>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h4>Sorting</h4>
    <p>
      Table definition is an optional <code>Array</code> of
      <code>Objects</code> that defines look and behavior of the table. Each
      object represents one column, has one required, unique key property and
      number of optional properties.
    </p>
    <pre class="p-0">
      <code>
    </code>
  </pre>
  </section>

  <vModal
    v-model="editModal"
    title="Edit"
    primaryButtonClose
    secondaryButtonClose
  >
    <pre>{{ editContent }}</pre>
  </vModal>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import vTable from "../vTable.vue";

import vPagination from "../vPagination.vue";
import vButton from "../vButton.vue";
import vBadge from "../vBadge.vue";
import vModal from "../vModal.vue";

import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import dataJSON from "../../MOCK_DATA (1).json";

export default {
  components: {
    vTable,
    vPagination,
    vButton,
    vBadge,
    vModal,
  },
  setup() {
    let reference = ref([
      {
        prop: "items",
        type: "Array",
        default: "undefined",
        description:
          "Data to display in table. Each element of Array is an Object. Single Object is one record (row) of data.",
      },
      {
        prop: "definition",
        type: "Array",
        default: "undefined",
        description: `Table definition is an optional <code>Array</code> of <code>Objects</code> that defines look and behavior of the table.`,
      },
      {
        prop: "filter",
        type: "String",
        default: "empty string",
        description: "String to filter array content.",
      },
      {
        prop: "locale",
        type: "String",
        default: "en-GB",
        description: "Locale used for sorting.",
      },
      {
        prop: "name",
        type: "String",
        default: "table",
        description:
          "Used only to select non default styles defined in styles.js",
      },
      {
        prop: "busy",
        type: "Boolean",
        default: "false",
        description: "When true renders table in busy (faded) state.",
      },
      {
        prop: "selection-mode",
        type: "String",
        default: "empty string",
        description:
          "Valid values are single (allows selection single row only), multiple (allows multiple rows to be selected) or empty string (disables selection).",
      },
      {
        prop: "page",
        type: "Number",
        default: "1",
        description: "Current page number.",
      },
      {
        prop: "items-per-page",
        type: "Number",
        default: "0",
        description: "Number of records (rows) on single page.",
      },
      {
        prop: "caption-top",
        type: "Boolean",
        default: "false",
        description:
          "Display caption on top. Set caption text in caption slot.",
      },
      {
        prop: "empty-text",
        type: "String",
        default: "",
        description: "Text displayed if table is empty.",
      },
      {
        prop: "empty-filtered-text",
        type: "String",
        default: "",
        description: "Text displayed if table is empty after filtering.",
      },
      {
        prop: "transition",
        type: "String",
        default: "fade-slide",
        description:
          "Animation to use for removing and adding records. Allowed values: fade-slide or empty string for no transition. <span class='fw-bold'>Default</span>: 'fade-slide'",
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
        key: "default",
        class: () => "whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let referenceStyles = ref([
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
        description: "Table row.",
      },
      {
        prop: "style-cell",
        description: "Table cell.",
      },
      {
        prop: "style-caption",
        description: "Table caption.",
      },
    ]);

    let referenceStylesDefinition = ref([
      {
        key: "prop",
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let referenceEvents = ref([
      {
        event: "update:page",
        description: "Emmited after filtering. Useful for pagination update",
      },
      {
        event: "update:filtered-count",
        description: "Emmited after filtering. Useful for pagination update",
      },
      {
        event: "input:selection",
        description: "Emmited after selecting rows. Contains array of selected records",
      },
    ]);

    let referenceEventsDefinition = ref([
      {
        key: "event",
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let referenceSlots = ref([
      {
        slot: "cell:key",
        description: "Slot for customizing display of cell value. Key is one of the keys of record data for example cell:first_name or cell:city",
      },
      {
        slot: "caption",
        description: "Slot for caption text. Position caption using caption-top prop",
      },
      {
        slot: "busy",
        description: "Slot for display of user defined content when table is busy for example spinners",
      },
    ]);

    let referenceSlotsDefinition = ref([
      {
        key: "slot",
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let definition = ref([
      {
        key: "id",
        visible: false,
      },
      {
        key: "first_name",
        sortable: true,
        class: () => "bg-red-50",
      },
      {
        key: "last_name",
        sortable: true,
        class: () => "bg-green-50",
      },
      {
        key: "email",
        sortable: true,
      },
      {
        key: "city",
        sortable: true,
        // visible: false,
      },
      {
        key: "country",
        sortable: true,
        class: (k, v) => (v == "ID" ? "bg-red-50" : ""),
      },
      {
        key: "edit",
      },
      // {
      //   key: "item_city"
      // },
    ]);

    let dataSmall = dataJSON.slice(0, 5);
    let data = dataJSON.slice(0, 10);
    let dataLong = dataJSON.slice(0, 100);

    let example = reactive({
      data: dataLong,
      page: 1,
      itemsPerPage: 10,
      filter: "",
      busy: false,
      selectionMode: "single",
      captionTop: false,
      transition: "fade-slide",
      locale: "en-GB",
    });

    let editModal = ref(false);
    let editContent = ref("");

    let edit = (c) => {
      editContent.value = c;
      editModal.value = true;
    };

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
      referenceStyles,
      referenceStylesDefinition,
      referenceEvents,
      referenceEventsDefinition,
      referenceSlots,
      referenceSlotsDefinition,
      editModal,
      edit,
      editContent,
      example,
    };
  },
};
</script>

<style scoped>
h3 {
  @apply text-3xl;
  @apply font-semibold;
}
h4 {
  @apply text-2xl;
  @apply font-semibold;
}
h5 {
  @apply text-xl;
  @apply font-semibold;
}
h6 {
  @apply text-lg;
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
  margin-bottom: 1em;
}
.nowrap {
  white-space: nowrap;
}
.example {
  margin-top: 2em;
}
pre {
  @apply whitespace-normal my-5;
}
pre code {
  @apply whitespace-pre;
}
.code-word {
  @apply text-sm bg-indigo-200 rounded p-1;
}
code {
  @apply text-sm;
}
label {
  @apply mr-2;
}
input[type="text"],
select {
  @apply rounded border-gray-300 focus:border-gray-400 focus:ring focus:ring-indigo-200 py-1;
}
</style>
