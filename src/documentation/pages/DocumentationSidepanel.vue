<template>
  <h3>Sidepanel</h3>
  <links-github-header component="vSidepanel" />

  <section>
    <h4 id="SidepanelReference">Reference</h4>
    <table-reference :items="reference.props" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->

    <h6 id="SidepanelSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <section>
    <h4 id="ExampleSidepanel">Example - props</h4>
    <div class="example">
      <example name="ExampleSidepanel"></example>
    </div>
  </section>

  <section id="ExampleSidepanelTrigger">
    <h4 id="ExampleSidepanelTrigger">Example - open by id</h4>
    <p>
    You can also control state of the sidepanel menu by using <code class="code-text">v-trigger</code> component. The <code class="code-text">for</code> prop of the <code class="code-text">v-trigger</code> should be the same as <code class="code-text">id</code> of the sidepanel. The advantage of this method is that <code class="code-text">v-triggers</code> can be put anywhere in application. Read more about v-trigger here.
    </p>
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
