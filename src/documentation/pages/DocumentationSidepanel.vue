<template>
  <h3>Sidepanel</h3>
  <links-github-header component="vSidepanel" />

  <section>
    <h4 id="SidepanelReference">Reference</h4>
    <table-reference :items="reference.props" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->

    <h6 id="SidepanelSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <sidepanel-md></sidepanel-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vSidepanel.json";
import sidepanelMd from "./sidepanel.md";

let reference = reactive(componentDocumentation);
</script>
