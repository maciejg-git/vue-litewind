<template>
  <h3>Notify</h3>
  <links-github-header component="vInput" />

  <section>
    <h4 id="InputReference">Reference - notify container</h4>
    <table-reference :items="referenceContainer.props" />

    <h4 id="InputReference">Reference - notify</h4>
    <table-reference :items="reference.props" />

    <h6 id="InputEvents">Events</h6>
    <table-reference-basic
      :items="reference.events"
      reference="event"
    />

    <h6 id="InputSlots">Slots - notify container</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <notify-md></notify-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentationContainer from "../components-documentation/vNotifyContainer.json";
import componentDocumentation from "../components-documentation/vNotify.json";
import notifyMd from "./notify.md";

let reference = reactive(componentDocumentation);
let referenceContainer = reactive(componentDocumentationContainer);
</script>

<style scoped></style>
