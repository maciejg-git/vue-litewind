<template>
  <h3>Divider</h3>
  <links-github-header component="vDivider" />

  <section>
    <h4 id="DividerReference">Reference</h4>
    <table-reference :items="reference.props" />
  </section>

  <divider-md></divider-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vDivider.json"
import dividerMd from "./divider.md"

let reference = reactive(componentDocumentation)
</script>
