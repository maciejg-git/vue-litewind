<template>
  <h3>Pagination</h3>
  <links-github-header component="vPagination" />

  <section>
    <h4 id="PaginationReference">Reference</h4>
    <table-reference :items="reference.props" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->
  </section>

  <pagination-md></pagination-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vPagination.json"
import paginationMd from "./pagination.md"

let reference = reactive(componentDocumentation)
</script>
