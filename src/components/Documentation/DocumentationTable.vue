<template>
  <h3>Table</h3>
  <p></p>

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

    <h6>Styling props</h6>
    <p></p>
    <v-table
      :items="referenceStyles"
      :definition="referenceStylesDefinition"
      style-table="default fixed"
      style-header-cell="default bordered"
      style-cell="default bordered"
    >
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
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
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
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
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>
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
      filtering etc you need to create definition array.
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
        <span class="font-bold">key</span>
        : key is one of the properties of data from items prop or a new key. New
        keys apear as additional columns and their content can be set using slot
        or function f.
      </li>
    </ul>
    <p>Optional properties:</p>
    <ul>
      <li>
        <span class="font-bold">label</span>
        : sets label for this column. If not present label is the same as key
        converted to Header Case (String, default: undefined)
      </li>
      <li>
        <span class="font-bold">sortable</span>
        : enables sorting of the column (Boolean, default: false)
      </li>
      <li>
        <span class="font-bold">filterable</span>
        : enables filtering of the column (Boolean, default: false))
      </li>
      <li>
        <span class="font-bold">visible</span>
        : toggles visiblity of the column (Boolean, default: false)
      </li>
      <li>
        <span class="font-bold">class</span>
        : function that should return string of classes to apply
        to each cell in column. Takes 3 arguments: key, value and item
        (Function, default: undefined)
      </li>
      <li>
        <span class="font-bold">f</span>
        : if defined this function is called for every cell in this column and
        the return value is set as content of the cell. Takes 3 arguments: key,
        value and item. This function cannot be used to add html to cell content
        (Function, default: undefined)
      </li>
      <li>
        <span class="font-bold">filterByFunction</span>
        : if true filter content of column using value from function f (Boolean,
        default: undefined)
      </li>
      <li>
        <span class="font-bold">sortByFunction</span>
        : if true sort content of column using value returned from function f
        (Boolean, default: undefined)
      </li>
    </ul>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <v-table
        :items="example.data"
        :definition="definition"
        :filter="example.filter"
        :page="example.page"
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
          example.page = $event;
          example.events.unshift({ ev: 'update:page', data: $event });
        "
        @input:selection="
          example.events.unshift({ ev: 'input:selection', data: $event })
        "
      >
        <template #cell:edit="{ item }">
          <v-button
            style-button="default tiny noMargin"
            @click.stop="edit(item)"
          >
            edit
          </v-button>
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

      <v-tabs theme="material" class="mt-10">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="locale">filter:</label>
            <v-input type="text" v-model="example.filter">
            </v-input>
          </div>
          <div class="mb-2">
            <label for="locale">locale:</label>
            <v-input type="text" id="locale" v-model="example.locale">
              </v-input>
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
      <code>
{{`<v-table
  :items="example.data"
  :definition="definition"
  :filter="example.filter"
  :page="example.page"
  :items-per-page="example.itemsPerPage"
  :busy="example.busy"
  :selectionMode="example.selectionMode"
  :captionTop="!!example.captionTop"
  :locale="example.locale"
  @update:filtered-count="
    example.itemsCount = $event;
    example.events.unshift({ ev: 'update:filtered-count', data: $event });
  "
  @update:page="
    example.page = $event;
    example.events.unshift({ ev: 'update:page', data: $event });
  "
  @input:selection="
    example.events.unshift({ ev: 'input:selection', data: $event })
  "
>
  <template #cell:edit="{ item }">
    <v-button
      style-button="default tiny noMargin"
      @click.stop="edit(item)"
    >
      edit
    </v-button>
  </template>
  <template #caption> Example caption </template>
</v-table>`}}
      </code>
    </pre>
  </section>

  <section>
    <h4>Sorting</h4>
    <p>
      To enable sorting of table you have to set it for every column in
      definition array using sorable property. By default records are sorted as
      strings and using locale prop to compare values. Number and dates are
      sorted as numbers and dates.
      <code>null</code>
      ,
      <code>undefined</code>
      and
      <code>NaN</code>
      values are always first when sorting in ascending direction.
    </p>
  </section>

  <section>
    <h4>Filtering</h4>
    <p>
      Similary to sorting you have to enable filtering for each column using
      filterable property in definition. After filtering following actions
      happens: event is emmited, selection is resetted.
    </p>
  </section>

  <section>
    <h4>Row selection</h4>
    <p>
      Component supports selecting rows when selecion-mode prop is set either to
      'single' or 'multiple'. After new row is selected or unselected event is
      emmited that conatins array of all selected records. Filtering, sorting,
      changing current page or modifying selection-mode prop resets current
      selection to empty array.
    </p>
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
          "Use this String to filter items. Filtering always emits update:page with value 1 and resets any active selection",
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
          "Enables or disables selection of rows. Valid values are 'single' (allows selection of single row only), 'multiple' (allows multiple rows to be selected) or empty string (disables selection). Changing this prop resets current selection",
      },
      {
        prop: "page",
        type: ["Number"],
        default: "1",
        description: "Current page number. Changing page resets current selection",
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
        description:
          "Name of the component",
      },
      {
        prop: "theme",
        type: ["String"],
        default: "default",
        description: "Theme to use",
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
        description: "Table row",
      },
      {
        prop: "style-cell",
        description: "Table cell",
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
@import "./Documentation.css";
</style>
