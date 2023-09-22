<template>
  <h3>Spinner</h3>
  <links-github-header component="vSpinner" />

  <section>
    <h4 id="SpinnerReference">Reference</h4>
    <table-reference :items="reference.props" />
  </section>

  <section>
    <h4 id="SpinnerExample">Example</h4>
    <div class="example">
      <example name="ExampleSpinner"></example>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vSpinner.json"

let reference = reactive(componentDocumentation)
</script>

<style scoped>
</style>
