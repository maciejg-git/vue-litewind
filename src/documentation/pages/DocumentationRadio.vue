<template>
  <h3>Radio</h3>
  <links-github-header component="vRadio" />

  <section>
    <h4 id="RadioReference">Reference</h4>
    <table-reference :items="reference.props" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->
  </section>

  <section>
    <h4 id="ExampleRadio">Example - props</h4>
    <div class="example">
      <example name="ExampleRadio"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleRadioGroup">Example - radio group</h4>
    <p>
    Radio inputs can be optionally wrapped with <code class="code-text">v-radio-group</code> to create group with single <code class="code-text">v-model</code>.
    </p>
    <div class="example">
      <example name="ExampleRadioGroup"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vRadio.json"

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
