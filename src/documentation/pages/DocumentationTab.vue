<template>
  <h3>Tab</h3>
  <links-github-header component="vTab" />

  <section>
    <h4 id="TabReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="TabSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vTab.json";

let reference = reactive(componentDocumentation);
</script>
