<template>
  <h3>Input</h3>
  <links-github-header component="vInput" />

  <section>
    <h4 id="InputReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="InputEvents">Events</h6>
    <table-reference-basic
      :items="reference.events"
      reference="event"
    />

    <h6 id="InputSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <input-md></input-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vInput.json";
import inputMd from "./input.md";

let reference = reactive(componentDocumentation);
</script>
