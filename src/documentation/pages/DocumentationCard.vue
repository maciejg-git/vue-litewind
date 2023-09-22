<template>
  <h3>Card</h3>
  <links-github-header component="vCard" />

  <section>
    <h4 id="CardReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="CardSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <section>
    <h4 id="ExampleCardSimple">Example - simple card</h4>
    <div class="example">
      <example name="ExampleCardSimple"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleCardHorizontal">Example - horizontal card</h4>
    <div class="example">
      <example name="ExampleCardHorizontal"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleCardOverlay">Example - overlay card</h4>
    <div class="example">
      <example name="ExampleCardOverlay"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleCardRounded">Example - flat card</h4>
    <div class="example">
      <example name="ExampleCardRounded"></example>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vCard.json"

let reference = reactive(componentDocumentation)
</script>

<style scoped>
</style>
