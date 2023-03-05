<template>
  <h3>Pagination</h3>
  <links-github-header component="vPagination" />

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

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
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vPagination.json"

export default {
  setup() {
    let reference = reactive(componentDocumentation)

    return {
      reference,
    };
  },
};
</script>

<style scoped>
</style>
