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
    <table-reference-basic :items="events"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots"></table-reference-basic>
  </section>

  <section>
    <h4>Definition</h4>
    <span class="font-bold">Type</span>
    :
    <code class="code-word">Array</code>
    <p>
      Table definition is an optional
      <code>Array</code>
      of
      <code>Objects</code>
      that defines columns of the table. Each object represents one column, has
      one required, unique key property and number of optional properties. If
      definition is not provided component makes one using first record of data.
      This may be enough for simple tables however to use features like sorting,
      filtering etc you need to provide definition array.
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
    <h4>Example</h4>
    <div class="example">
      <v-table
        :items="example.data"
        :definition="example.definition"
        :filter="example.filter"
        v-model:page="example.page"
        :items-per-page="example.itemsPerPage"
        :state="example.state"
        :selectionMode="example.selectionMode"
        :captionTop="!!example.captionTop"
        :locale="example.locale"
        @update:filtered-count="
          example.itemsCount = $event;
          example.events.unshift({ ev: 'update:filtered-count', data: $event });
        "
        @update:page="
          example.events.unshift({ ev: 'update:page', data: $event })
        "
        @input:selection="
          example.events.unshift({ ev: 'input:selection', data: $event })
        "
        class="min-w-full"
      >
        <template #cell:edit="{ item }">
          <v-button style-button="tiny" @click.stop="edit(item)">edit</v-button>
        </template>
        <template #caption>Example caption</template>
      </v-table>
      <div class="lg:flex justify-between my-5">
        <div>
          <v-pagination
            v-model="example.page"
            :items-count="example.itemsCount"
            :items-per-page="example.itemsPerPage"
            max-pages="7"
            icons
          ></v-pagination>
        </div>
        <div class="mt-4 lg:mt-0">
          <label for="items-per-page" class="mr-10">Items per page</label>
          <v-select v-model="example.itemsPerPage" id="items-per-page">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </v-select>
        </div>
      </div>

      <v-tabs name="tabs-material" class="mt-10">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="locale">filter:</label>
            <v-input type="text" v-model="example.filter"></v-input>
          </div>
          <div class="mb-2">
            <label for="locale">locale:</label>
            <v-input type="text" id="locale" v-model="example.locale"></v-input>
          </div>
          <div class="mb-2">
            <label for="busy">state:</label>
            <v-select id="busy" v-model="example.state">
              <option value="">empty string (normal state)</option>
              <option value="busy">busy</option>
            </v-select>
          </div>
          <div class="mb-2">
            <label for="selection-mode">selection-mode:</label>
            <v-select id="selection-mode" v-model="example.selectionMode">
              <option value="single">single</option>
              <option value="multiple">multiple</option>
              <option value="">empty string (selection disabled)</option>
            </v-select>
          </div>
          <div class="mb-2">
            <label for="caption-top">caption-top:</label>
            <v-select id="caption-top" v-model="example.captionTop">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </v-select>
          </div>
        </v-tab>
        <v-tab>
          <template #name>
            Events
            <v-badge style-badge="secondary tiny" class="ml-2">
              {{ example.events.length }}
            </v-badge>
          </template>
          <div class="overflow-y-scroll max-h-48 mt-5">
            <div class="px-2 pb-2">
              <template v-for="ev in example.events">
                <div class="py-1">
                  <code class="code-word">{{ ev.ev }}</code>
                  {{ ev.data }}
                </div>
              </template>
            </div>
          </div>
        </v-tab>
      </v-tabs>
    </div>
    <pre>
      <code class="language-html">
&lt;v-table
  :items=&quot;example.data&quot;
  :definition=&quot;definition&quot;
  :filter=&quot;example.filter&quot;
  :page=&quot;example.page&quot;
  :items-per-page=&quot;example.itemsPerPage&quot;
  :state=&quot;example.state&quot;
  :selectionMode=&quot;example.selectionMode&quot;
  :captionTop=&quot;!!example.captionTop&quot;
  :locale=&quot;example.locale&quot;
  @update:filtered-count=&quot;
    example.itemsCount = $event;
    example.events.unshift({ ev: 'update:filtered-count', data: $event });
  &quot;
  @update:page=&quot;
    example.page = $event;
    example.events.unshift({ ev: 'update:page', data: $event });
  &quot;
  @input:selection=&quot;
    example.events.unshift({ ev: 'input:selection', data: $event })
  &quot;
&gt;
  &lt;template #cell:edit=&quot;{ item }&quot;&gt;
    &lt;v-button
      style-button=&quot;tiny&quot;
      @click.stop=&quot;edit(item)&quot;
    &gt;
      edit
    &lt;/v-button&gt;
  &lt;/template&gt;
  &lt;template #caption&gt;Example caption&lt;/template&gt;
&lt;/v-table&gt;
      </code>
    </pre>
    <pre>
      <code class="language-js">
let definition = ref([
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
]);
      </code>
    </pre>
  </section>
  <v-modal
    v-model="editModal"
    title="Edit"
    primaryButtonClose
    secondaryButtonClose
  >
    <pre>{{ editContent }}</pre>
  </v-modal>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import hljs from "highlight.js";
import dataJSON from "../../data.json";

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
        description: `Table definition is an optional <code>Array</code> of <code>Objects</code> that defines look and behavior of the table.`,
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
          "Use this String to filter items. Filtering always emits <span class='code-word'>update:page</span> with value 1 and resets any active selection",
      },
      {
        prop: "locale",
        type: ["String"],
        default: "en-GB",
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
          "Enables or disables selection of rows. Valid values are 'single' (allows selection of single row only), 'multiple' (allows multiple rows to be selected) or empty string (disables selection). After new row is selected or unselected event <span class='code-word'>input:selection</span> is emmited that conatins array of all selected records. <span class='font-semibold'>Filtering</span>, <span class='font-semibold'>sorting</span>, <span class='font-semibold'>changing current page</span> or <span class='font-semibold'>modifying selection-mode prop</span> resets current selection by emmiting empty array",
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
        default: "Empty table",
        description: "Text displayed if table is empty",
      },
      {
        prop: "empty-filtered-text",
        type: ["String"],
        default: "No records for current filter",
        description:
          "Text displayed if table is empty after filtering out all items",
      },
      {
        prop: "name",
        type: ["String"],
        default: "table",
        description: "Name of the component",
      },
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
        prop: "update:page",
        description: "Emmited after filtering. Useful for updating pagination",
      },
      {
        prop: "update:filtered-count",
        description: "Emmited after filtering. Useful for updating pagination",
      },
      {
        prop: "input:selection",
        description:
          "Emmited after selecting rows. Event data contains array of selected records",
      },
    ]);

    let slots = ref([
      {
        prop: "cell:key",
        description:
          "Slot for cell content. Useful for adding some html formatting, transforming value etc. Key is one of the keys of data record or additional key from definition array<p class='mt-4'>Slot props: <code class='code-word'>value</code>, <code class='code-word'>item</code></p>",
      },
      {
        prop: "caption",
        description:
          "Slot for caption text. Position caption using caption-top prop",
      },
      {
        prop: "busy",
        description:
          "Content of this slot replaces data records if table is busy",
      },
      {
        prop: "empty-table-message",
        description:
          "Slot for custom empty table message when item prop is empty table",
      },
      {
        prop: "empty-filtered-table-message",
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
          "enables sorting of the column. By default records are sorted as strings and using locale prop to compare values. Number and dates are sorted as numbers and dates. <code>null</code>,<code>undefined</code> and <code>NaN</code> values are always first when sorting in ascending direction",
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
          "function that should return string of classes to apply to each cell in column. Takes 3 arguments: <code>key</code>, <code>value</code> and <code>item</code>",
      },
      {
        prop: "f",
        type: ["Function"],
        default: "undefined",
        description:
          "if defined this function is called for every cell in this column and the return value is set as content of the cell. Takes 3 arguments: <code>key</code>, <code>value</code> and <code>item</code>. This function cannot be used to add html to cell content",
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

    let dataSmall = dataJSON.slice(0, 5);
    let data = dataJSON.slice(0, 10);
    let dataLong = dataJSON.slice(0, 60);

    let example = reactive({
      data: dataLong,
      page: 1,
      itemsPerPage: 5,
      filter: "",
      busy: false,
      selectionMode: "single",
      captionTop: false,
      locale: "en-GB",
      state: "",
      events: [],
      definition: [
        {
          key: "id",
          visible: false,
        },
        {
          key: "first_name",
          sortable: true,
          // class: () => "bg-red-50",
        },
        {
          key: "last_name",
          sortable: true,
          // class: () => "bg-green-50",
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
      ],
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
      reference,
      styles,
      events,
      slots,
      referenceProp,
      referencePropDefinition,
      editModal,
      edit,
      editContent,
      example,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
