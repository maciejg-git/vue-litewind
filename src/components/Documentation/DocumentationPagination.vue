<template>
  <h3>Pagination</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->
  </section>

  <section>
    <h4>Example</h4>
    <p>
      For more examples see
      <a class="link" href="/documentation/table">table component</a>
      .
    </p>
    <div class="example">
      <example name="ExamplePagination"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { sharedProps, styleProps } from "./shared-props"

export default {
  setup() {
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
          "Number of items per page. Pagination uses this value to compute the number of pages to render. It is usually provided by another component that uses pagination for navigation. 0 disables pagination (displays only 1 page)",
      },
      {
        prop: "items-count",
        type: ["Number"],
        default: "undefined",
        description:
          "Total number of items. Pagination uses this value to compute the number of pages to render. It is usually provided by another component that uses pagination for navigation",
      },
      {
        prop: "max-pages",
        type: ["Number"],
        default: "undefined",
        description:
          "Maximum number of pages to display. This prop must have value of 3 or more",
      },
      ...styleProps(),
      ...sharedProps(),
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
    ]);

    return {
      reference,
      styles,
      events,
    };
  },
};
</script>

<style scoped>
</style>
