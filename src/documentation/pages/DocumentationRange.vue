<template>
  <h3>Range</h3>
  <links-github-header component="vRange" />

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleRange"></example>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vRange.json"

let reference = reactive(componentDocumentation)
</script>
