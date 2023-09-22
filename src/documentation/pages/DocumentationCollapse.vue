<template>
  <h3>Collapse</h3>
  <links-github-header component="vCollapse" />

  <section>
    <h4 id="CollapseReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="CollapseSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />

    <h6 id="CollapseComponents">Components</h6>
    <table-reference-basic
      :items="components"
      reference="component"
    />
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="CollapseNotes">Notes</h4>
    <ul class="mt-6 flex flex-col gap-y-7">
      <li>
        <header class="mb-2 text-lg font-semibold dark:text-text-200">
          Collapse activation
        </header>
        You can activate collapse in two ways: by using
        <code class="code-text">reference</code>
        slot or
        <code class="code-text">v-model</code>
        . Slot is recommened as it takes minimal set up and can be done in
        template alone.
        <code class="code-text">v-model</code>
        can still be used to programatically toggle collapse.
      </li>
      <li>
        <header class="mb-2 text-lg font-semibold dark:text-text-200">
          Accordion
        </header>
        You can wrap group of
        <code class="code-text">v-collapse</code>
        components with
        <code class="code-text">v-accordion</code>
        to create accordion. See example below.
      </li>
    </ul>
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="ExampleCollapse">Example</h4>
    <div class="example">
      <example name="ExampleCollapse"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleCollapseAccordion">Example - accordion</h4>
    <div class="example">
      <p>
        Turn collapse components to accordion by wrapping them with
        <code class="code-text">v-accordion</code>
        component. In accordion mode only one collapse element can be opened.
      </p>
      <example name="ExampleCollapseAccordion"></example>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vCollapse.json";

let reference = reactive(componentDocumentation);

let components = ref([
  {
    component: "v-button-chevron",
    description:
      "Optional version of v-button that has indicator build in. It uses the same props as v-button. Use v-button-chevron for minimal setup or normal v-button for more customizing options.",
  },
]);
</script>

<style scoped></style>
