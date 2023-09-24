<template>
  <h3>Modal</h3>
  <links-github-header component="vModal" />

  <section>
    <h4 id="ModalReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="ModalEvents">Events</h6>
    <table-reference-basic
      :items="reference.events"
      reference="event"
    />

    <h6 id="ModalSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <modal-md></modal-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vModal.json";
import modalMd from "./modal.md";

let reference = reactive(componentDocumentation);
</script>
