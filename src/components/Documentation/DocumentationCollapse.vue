<template>
  <h3>Collapse</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />

    <h6>Components</h6>
    <table-reference-basic :items="components" reference="component" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleCollapse"></example>
    </div>
  </section>

  <section>
    <h4>Example - accordion</h4>
    <div class="example">
      <p>
        Turn collapse components to accordion by wrapping them with <code class="code-text">v-accordion</code>
        component. In accordion mode only one collapse element can be opened.
      </p>
      <example name="ExampleCollapseAccordion"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Boolean"],
        default: "undefined",
        description:
          "Setting v-model to <code class='code-text'>true</code> shows collapsible element, <code class='code-text'>false </code>value hides it",
      },
    ]);

    let slots = ref([
      {
        slot: "default",
        description: "Slot for content that is collapsed",
      },
    ]);

    let components = ref([
      {
        component: "v-button-collapse",
        description: "Optional version of <code class='code-text'>v-button</code> that has indicator build in and automatically toggles attached <code class='code-text'>v-model</code> on click. It uses the same props as <code class='code-text'>v-button</code> as well as props of <code class='code-text'>v-chevron</code>. Use <code class='code-text'>v-button-collapse</code> for minimal setup or normal <code class='code-text'>v-button</code> for more customizing options.",
      },
    ]);

    return {
      reference,
      slots,
      components,
    };
  },
};
</script>

<style scoped>
</style>
