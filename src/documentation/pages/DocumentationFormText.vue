<template>
  <h3>Form text</h3>
  <links-github-header component="vFormText" />

  <section>
    <h4 id="FormtextReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="FormtextSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <form-text-md></form-text-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vFormText.json";
import formTextMd from "./form-text.md";

let reference = reactive(componentDocumentation);
</script>
