<template>
  <h3>Tree</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

    <h6>Events</h6>
    <table-reference-basic :items="reference.events" reference="event" />

    <h6>Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />

    <h6>Functions</h6>
    <table-reference-basic :items="functions" reference="function" />
  </section>

  <section>
    <h4>Example - simple tree</h4>
    <div class="example">
      <example name="ExampleTreeSimple"></example>
    </div>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleTree"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "./components-documentation/vTree.json"

export default {
  setup() {
    let reference = reactive(componentDocumentation)

    let functions = ref([
      {
        function: "openAllLevel(level: Number)",
        description:
          "Opens all nodes on level (0 for root, any high number to open all nodes)",
      },
      {
        function: "closeAll()",
        description:
          "Closes all nodes",
      },
    ]);

    return {
      reference,
      functions,
    };
  },
};
</script>

<style scoped>
</style>
