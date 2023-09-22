<template>
  <h3>Button</h3>
  <links-github-header component="vChip" />

  <section>
    <h4 id="ChipReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="ChipSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <section>
    <h4 id="ExampleChip">Example</h4>
    <div class="example">
      <example name="ExampleChip" auto-show-code></example>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vChip.json"

let reference = reactive(componentDocumentation)
</script>

<style scoped></style>
