<template>
  <h3>List Item</h3>
  <links-github-header component="vListItem" />

  <section>
    <h4 id="ListItemReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="ListItemSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vListItem.json"

let reference = reactive(componentDocumentation)
</script>

<style scoped>
</style>
