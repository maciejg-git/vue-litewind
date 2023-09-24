<template>
  <h3>Table</h3>
  <links-github-header component="vTable" />

  <section>
    <h4 id="TableReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="TableEvents">Events</h6>
    <table-reference-basic
      :items="reference.events"
      reference="event"
    />

    <h6 id="TableSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <table-md></table-md>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vTable.json";
import tableMd from "./table.md"

let reference = reactive(componentDocumentation);
</script>

<style scoped></style>
