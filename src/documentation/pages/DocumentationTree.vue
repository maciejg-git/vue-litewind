<template>
  <h3>Tree</h3>
  <links-github-header component="vTree" />

  <section>
    <h4 id="TreeReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="TreeEvents">Events</h6>
    <table-reference-basic
      :items="reference.events"
      reference="event"
    />

    <h6 id="TreeSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />

    <h6 id="TreeFunctions">Functions</h6>
    <table-reference-basic
      :items="reference.functions"
      reference="function"
    />
  </section>

  <tree-md></tree-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vTree.json";
import treeMd from "./tree.md";

let reference = reactive(componentDocumentation);
</script>
