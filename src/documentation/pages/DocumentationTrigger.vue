<template>
  <h3>Trigger</h3>
  <links-github-header component="vTrigger" />

  <section>
    <h4 id="TriggerReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="TriggerSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <trigger-md></trigger-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vTrigger.json";
import triggerMd from "./trigger.md";

let reference = reactive(componentDocumentation);
</script>
