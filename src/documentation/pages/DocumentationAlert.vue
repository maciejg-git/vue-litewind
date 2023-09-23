<template>
  <h3>Alert</h3>
  <links-github-header component="vAlert" />

  <section>
    <h4 id="AlertReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="AlertSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <alert-md></alert-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vAlert.json";
import alertMd from "./alert.md";

let reference = reactive(componentDocumentation);
</script>
