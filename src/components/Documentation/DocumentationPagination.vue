<template>
  <h3>Pagination</h3>
  <p class="text-xl font-light">Pagination component</p>

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
  </section>

  <section>
    <h4>Example</h4>
    <p>For more examples see <a href="">table component</a>.</p>
    <div class="example">
      <v-pagination
        v-model="example.page"
        :items-count="example.itemsCount"
        :items-per-page="example.itemsPerPage"
        :max-pages="example.maxPages"
        :icons="example.icons"
        @update:modelValue="
          example.events.unshift({ ev: 'update:modelValue', data: $event })
        "
      />
      <v-tabs name="tabsMaterial" class="mt-5">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="model" class="font-semibold">v-model: </label>
            <input type="text" id="model" v-model="example.page" />
          </div>
          <div class="mb-2">
            <label for="model">items-count: </label>
            <input type="text" id="model" v-model="example.itemsCount" />
          </div>
          <div class="mb-2">
            <label for="model">items-per-page: </label>
            <input type="text" id="model" v-model="example.itemsPerPage" />
          </div>
          <div class="mb-2">
            <label for="model">max-pages: </label>
            <input type="text" id="model" v-model="example.maxPages" />
          </div>
          <div class="mb-2">
            <label for="range">icons: </label>
            <select id="range" v-model="example.icons">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </select>
          </div>
        </v-tab>
        <v-tab name="Events">
          <div class="overflow-y-auto max-h-48 mt-5 w-full">
            <div class="px-2 pb-2">
              <template v-for="ev in example.events">
                <div class="py-1">
                  <code class="code-word">{{ ev.ev }}</code> {{ ev.data }}
                </div>
              </template>
            </div>
          </div>
        </v-tab>
      </v-tabs>
    </div>
    <pre>
      <code>
{{`<v-pagination
  v-model="example.page"
  :items-count="example.itemsCount"
  :items-per-page="example.itemsPerPage"
  :max-pages="example.maxPages"
  :icons="example.icons"
  @update:modelValue="example.events.unshift({ ev: 'update:modelValue', data: $event })"
  />`}}
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
        prop: "v-model",
        type: "Number",
        default: "undefined",
        description: "Current page",
      },
      {
        prop: "items-per-page",
        type: "Number",
        default: "undefined",
        description: "Number of items per page. Component uses this value to compute number of pages to render. It is usually provided by another component that uses pagination for navigation",
      },
      {
        prop: "items-count",
        type: "Number",
        default: "undefined",
        description:
          "Total number of items. Component uses this value to compute number of pages to render. It is usually provided by another component that uses pagination for navigation",
      },
      {
        prop: "max-pages",
        type: "Number",
        default: "undefined",
        description:
          "Maximum number of pages to display. This prop must have value of 3 or more",
      },
      {
        prop: "icons",
        type: "Boolean",
        default: "true",
        description:
          "If true use icons for next/previous buttons instead of labels",
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
        prop: "style-pagination-bar",
        description: "Main table element",
      },
      {
        prop: "style-page",
        description: "Style of single page button",
      },
      {
        prop: "style-page-active",
        description: "Style of active page button",
      },
      {
        prop: "style-dots",
        description: "Style of dots separating pages",
      },
      {
        prop: "style-next",
        description: "Style of next page button",
      },
      {
        prop: "style-prev",
        description: "Style of previous page button",
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
        event: "update:modelValue",
        description: "Update v-model",
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
        slot: "-",
        description: "This component does not provide any slots.",
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

    let example = reactive({
      page: 1,
      itemsPerPage: 5,
      itemsCount: 50,
      maxPages: 7,
      icons: true,
      events: [],
    });

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      referenceDefinition,
      referenceStyles,
      referenceStylesDefinition,
      referenceEvents,
      referenceEventsDefinition,
      referenceSlots,
      referenceSlotsDefinition,
      example,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
