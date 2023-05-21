<template>
  <h3>Tree</h3>
  <links-github-header component="vTree" />

  <section>
    <h4 id="TreeReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="TreeEvents">Events</h6>
    <table-reference-basic :items="reference.events" reference="event" />

    <h6 id="TreeSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />

    <h6 id="TreeFunctions">Functions</h6>
    <table-reference-basic :items="reference.functions" reference="function" />
  </section>

  <section>
    <h4 id="ExampleTreeSimple">Example - simple tree</h4>
    <div class="example">
      <example name="ExampleTreeSimple"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleTree">Example - props and events</h4>
    <div class="example">
      <example name="ExampleTree"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vTree.json"

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
