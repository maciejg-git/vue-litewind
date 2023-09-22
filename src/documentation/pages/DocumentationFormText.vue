<template>
  <h3>Form text</h3>
  <links-github-header component="vFormText" />

  <section>
    <h4 id="FormtextNotes">Notes</h4>
    <p class="mt-6">
      <code class="code-text">v-form-text</code> is used by form components to display validation messages. See Form Validation for examples.
    </p>
  </section>

  <section>
    <h4 id="FormtextReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="FormtextSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vFormText.json"

let reference = reactive(componentDocumentation)
</script>

<style scoped>
</style>
