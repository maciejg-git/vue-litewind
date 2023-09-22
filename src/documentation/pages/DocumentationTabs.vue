<template>
  <h3>Tabs</h3>
  <links-github-header component="vTabs" />

  <section>
    <h4 id="TabsReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="TabsEvents">Events</h6>
    <table-reference-basic
      :items="reference.events"
      reference="event"
    />

    <h6 id="TabsSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />

    <h6 id="TabsComponents">Components</h6>
    <p>
      <a
        href="/documentation/tab"
        class="link"
      >
        v-tab
      </a>
    </p>
  </section>

  <section>
    <h4 id="ExampleTabsSimple">Example - simple tabs</h4>
    <div class="example">
      <example name="ExampleTabsSimple"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleTabs">Example - props and events</h4>
    <div class="example">
      <example name="ExampleTabs"></example>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vTabs.json";

let reference = reactive(componentDocumentation);
</script>

<style scoped></style>
