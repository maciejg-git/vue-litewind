<template>
  <h3>Button</h3>
  <links-github-header component="vButton" />

  <section>
    <h4 id="ButtonReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="ButtonSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <section>
    <button-md></button-md>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vButton.json"
import buttonMd from "./button.md"

let reference = reactive(componentDocumentation)
</script>
