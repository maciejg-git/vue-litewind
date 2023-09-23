<template>
  <h3>Breadcrumb</h3>
  <links-github-header component="vBreadcrumb" />

  <section>
    <h4 id="BreadcrumbReference">Reference</h4>
    <table-reference :items="reference.props" />
  </section>

  <breadcrumb-md></breadcrumb-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vBreadcrumb.json";
import breadcrumbMd from "./breadcrumb.md"

let reference = reactive(componentDocumentation);
</script>

<style scoped></style>
