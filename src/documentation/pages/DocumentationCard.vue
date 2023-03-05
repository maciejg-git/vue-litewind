<template>
  <h3>Card</h3>
  <links-github-header component="vCard" />

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

    <h6>Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <section>
    <h4>Example - simple card</h4>
    <div class="example">
      <example name="ExampleCardSimple"></example>
    </div>
  </section>

  <section>
    <h4>Example - horizontal card</h4>
    <div class="example">
      <example name="ExampleCardHorizontal"></example>
    </div>
  </section>

  <section>
    <h4>Example - overlay card</h4>
    <div class="example">
      <example name="ExampleCardOverlay"></example>
    </div>
  </section>

  <section>
    <h4>Example - flat card</h4>
    <div class="example">
      <example name="ExampleCardRounded"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vCard.json"

export default {
  setup() {
    let reference = reactive(componentDocumentation)

    return {
      reference,
    };
  },
};
</script>

<style scoped>
</style>
