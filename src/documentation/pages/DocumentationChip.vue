<template>
  <h3>Button</h3>
  <links-github-header component="vChip" />

  <section>
    <h4 id="ChipReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="ChipSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <chip-md></chip-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vChip.json";
import chipMd from "./chip.md";

let reference = reactive(componentDocumentation);
</script>
