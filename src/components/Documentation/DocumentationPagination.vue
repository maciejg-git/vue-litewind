<template>
  <h3>Pagination</h3>
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
  </section>

  <section>
    <h4>Example</h4>
    <p>For more examples see <a class="link" href="/documentation/table">table component</a>.</p>
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
      <v-tabs name="tabs-material" class="mt-10">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="model" class="font-semibold">v-model: </label>
            <v-input type="text" id="model" v-model="example.page">
            </v-input>
          </div>
          <div class="mb-2">
            <label for="items-count">items-count: </label>
            <v-input type="text" id="items-count" v-model="example.itemsCount">
            </v-input>
          </div>
          <div class="mb-2">
            <label for="items-per-page">items-per-page: </label>
            <v-input
              type="text"
              id="items-per-page"
              v-model="example.itemsPerPage"
            >
            </v-input>
          </div>
          <div class="mb-2">
            <label for="max-pages">max-pages: </label>
            <v-input type="text" id="max-pages" v-model="example.maxPages">
            </v-input>
          </div>
          <div class="mb-2">
            <label for="icons">icons: </label>
            <v-select id="icons" v-model="example.icons">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </v-select>
          </div>
        </v-tab>
        <v-tab name="Events">
          <template #name>
            Events
            <v-badge style-badge="secondary tiny" class="ml-2">
              {{ example.events.length }}
            </v-badge>
          </template>
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
      <code class="language-html">
&lt;v-pagination
  v-model=&quot;example.page&quot;
  :items-count=&quot;example.itemsCount&quot;
  :items-per-page=&quot;example.itemsPerPage&quot;
  :max-pages=&quot;example.maxPages&quot;
  :icons=&quot;example.icons&quot;
  @update:modelValue=&quot;
    example.events.unshift({ ev: 'update:modelValue', data: $event })
  &quot;
/&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import hljs from "highlight.js";

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Number"],
        default: "undefined",
        description: "Current page",
      },
      {
        prop: "items-per-page",
        type: ["Number"],
        default: "undefined",
        description:
          "Number of items per page. Pagination uses this value to compute number of pages to render. It is usually provided by another component that uses pagination for navigation",
      },
      {
        prop: "items-count",
        type: ["Number"],
        default: "undefined",
        description:
          "Total number of items. Pagination uses this value to compute number of pages to render. It is usually provided by another component that uses pagination for navigation",
      },
      {
        prop: "max-pages",
        type: ["Number"],
        default: "undefined",
        description:
          "Maximum number of pages to display. This prop must have value of 3 or more",
      },
      {
        prop: "icons",
        type: ["Boolean"],
        default: "true",
        description:
          "If true use icons for next/previous buttons instead of labels",
      },
      {
        prop: "name",
        type: ["String"],
        default: "pagination",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-pagination-bar",
        description: "Main table element",
      },
      {
        prop: "style-page",
        description: "Style of single page button",
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

    let events = ref([
      {
        prop: "update:modelValue",
        description: "Update v-model",
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
      styles,
      events,
      example,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
