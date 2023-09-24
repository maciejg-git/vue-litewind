<template>
  <h3>Progress</h3>
  <links-github-header component="vProgress" />

  <section>
    <h4 id="ProgressReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="ProgressSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <progress-md></progress-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vProgress.json"
import progressMd from "./progress.md"

let reference = reactive(componentDocumentation)
</script>
