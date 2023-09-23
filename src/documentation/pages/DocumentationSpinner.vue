<template>
  <h3>Spinner</h3>
  <links-github-header component="vSpinner" />

  <section>
    <h4 id="SpinnerReference">Reference</h4>
    <table-reference :items="reference.props" />
  </section>

  <spinner-md></spinner-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vSpinner.json"
import spinnerMd from "./spinner.md"

let reference = reactive(componentDocumentation)
</script>
