<template>
  <h3>Chevron</h3>
  <links-github-header component="vChevron" />

  <section>
    <h4 id="ChevronReference">Reference</h4>
    <table-reference :items="reference.props" />
  </section>

  <chevron-md></chevron-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vChevron.json"
import chevronMd from "./chevron.md"

let reference = reactive(componentDocumentation)
</script>
