<template>
  <h3>Divider</h3>
  <links-github-header component="vDivider" />

  <section>
    <h4 id="DividerReference">Reference</h4>
    <table-reference :items="reference.props" />
  </section>

  <section>
    <h4 id="ExampleDivider">Example</h4>
    <div class="example">
      <example name="ExampleDivider" auto-show-code></example>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vDivider.json"

let reference = reactive(componentDocumentation)
</script>

<style scoped>
</style>
