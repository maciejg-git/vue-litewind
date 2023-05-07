<template>
  <h3>Alert</h3>
  <links-github-header component="vAlert" />

  <section>
    <h4 id="AlertReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="AlertSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <section>
    <h4 id="ExampleAlertSimple">Example - simple alert</h4>
    <div class="example">
      <example name="ExampleAlertSimple" auto-show-code></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleAlert">Example</h4>
    <div class="example">
      <example name="ExampleAlert"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vAlert.json"

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
