<template>
  <h3>Select</h3>
  <links-github-header component="vSelect" />

  <section>
    <h4 id="SelectReference">Reference</h4>
    <p class="my-10">
      This component also allows props of
      <code class="code-text">v-input</code>
      . See documentation here.
    </p>
    <table-reference :items="reference.props" />

    <h6 id="SelectEvents">Events</h6>
    <p class="my-10">
      This component also emits events of
      <code class="code-text">v-input</code>
      . See documentation here.
    </p>
    <table-reference-basic
      :items="reference.events"
      reference="event"
    />

    <h6 id="SelectSlots">Slots</h6>
    <p class="my-10">
      This component also allows slots of
      <code class="code-text">v-input</code>
      . See documentation here.
    </p>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <select-md></select-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vSelect.json";
import selectMd from "./select.md";

let reference = reactive(componentDocumentation);
</script>
