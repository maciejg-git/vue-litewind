<template>
  <h3>Card</h3>
  <links-github-header component="vCard" />

  <section>
    <p>
    Grids components can be used to make flexbox layouts. It is easy to create responsive layouts with Tailwind so those components are just single, named divs to distinguish layout elements from other divs. Combine them with Tailwind utilities to create grids similar to Bootstrap and others.
    </p>
    <p>
    Grid components:
    </p>
    <ul class="ml-4">
      <li><code class="code-text">v-container</code></li>
      <li><code class="code-text">v-row</code></li>
      <li><code class="code-text">v-col</code></li>
      <li><code class="code-text">v-auto-col</code></li>
    </ul>
  </section>

  <!-- <section> -->
  <!--   <h4 id="CardReference">Reference</h4> -->
  <!--   <table-reference :items="reference.props" /> -->
  <!---->
  <!--   <h6 id="CardSlots">Slots</h6> -->
  <!--   <table-reference-basic :items="reference.slots" reference="slot" /> -->
  <!-- </section> -->

  <section>
    <h4 id="ExampleGridSimple">Example - simple card</h4>
    <div class="example">
      <example name="ExampleGridSimple"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
// import componentDocumentation from "../components-documentation/vCard.json"

export default {
  setup() {
    // let reference = reactive(componentDocumentation)

    // return {
    //   reference,
    // };
  },
};
</script>

<style scoped>
</style>
