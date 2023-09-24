<template>
  <h3>Dropdown Menu Item</h3>
  <links-github-header component="vDropdownMenuItem" />

  <section>
    <h4 id="vDropdownMenuItemReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="vDropdownMenuItemSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vDropdownMenuItem.json";

let reference = reactive(componentDocumentation);
</script>
