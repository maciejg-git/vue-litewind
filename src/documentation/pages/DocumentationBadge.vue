<template>
  <h3>Badge</h3>
  <links-github-header component="vBadge" />

  <section>
    <h4 id="BadgeReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="BadgeSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <badge-md></badge-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vBadge.json"
import badgeMd from "./badge.md"

let reference = reactive(componentDocumentation)
</script>
