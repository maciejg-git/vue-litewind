<template>
  <h3>Sidepanel</h3>
  <links-github-header component="vSidepanel" />

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->

    <h6>Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleSidepanel"></example>
    </div>
  </section>

  <section id="ExampleSidepanelTrigger" class="scroll-mt-20">
    <h4>Example - open by id</h4>
    <div class="example">
      <example name="ExampleSidepanelTrigger"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vSidepanel.json"

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
