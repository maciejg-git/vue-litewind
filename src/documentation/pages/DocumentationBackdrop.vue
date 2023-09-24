<template>
  <h3>Backdrop</h3>
  <links-github-header component="vBackdrop" />

  <section>
    <h4 id="ButtonReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="ButtonSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <backdrop-md></backdrop-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vBackdrop.json";
import backdropMd from "./backdrop.md";

let reference = reactive(componentDocumentation);
</script>
