<template>
  <h3>Radio</h3>
  <links-github-header component="vRadio" />

  <section>
    <h4 id="RadioReference">Reference</h4>
    <table-reference :items="reference.props" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->
  </section>

  <radio-md></radio-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vRadio.json"
import radioMd from "./radio.md"

let reference = reactive(componentDocumentation)
</script>
