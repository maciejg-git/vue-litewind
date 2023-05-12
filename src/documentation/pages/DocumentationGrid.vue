<template>
  <h3>Grid</h3>
  <links-github-header component="vCard" />

  <section>
    <h4 id="GridUsage">Usage</h4>
    <p> 
    Grids components can be used to make flexbox layouts. Those components are very simple with no props or default classes (just single divs). Combine them with Tailwind responsive utility classes to create grids similar to Bootstrap and others.
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

  <section>
    <h4 id="ExampleGridSimple">Example - simple</h4>
    <p>
      Basic 12 columns layout with percentage widths similar to Bootstrap. You can use <code class="code-text">gap-x-*</code> utilities to create gutters.
    </p>
    <div class="example">
      <example name="ExampleGridSimple"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridAuto">Example - auto width columns</h4>
    <p>
    <code class="code-text">v-auto-col</code> component will generate columns that fit available space in the row.
    </p>
    <div class="example">
      <example name="ExampleGridAuto"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridAlignHorizontal">Example - row horizontal alignment</h4>
    <div class="example">
      <example name="ExampleGridAlignHorizontal"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridAlignVertical">Example - row vertical alignment</h4>
    <div class="example">
      <example name="ExampleGridAlignVertical"></example>
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
