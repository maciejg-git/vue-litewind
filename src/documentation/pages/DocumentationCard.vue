<template>
  <h3>Card</h3>
  <links-github-header component="vCard" />

  <section>
    <h4 id="CardReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="CardSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <card-md></card-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vCard.json";
import cardMd from "./card.md";

let reference = reactive(componentDocumentation);
</script>
