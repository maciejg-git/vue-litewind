<template>
  <h3>Collapse</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots"></table-reference-basic>

    <h6>Components</h6>
    <p></p>
    <table-reference-basic :items="components"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-collapse></example-collapse>
    </div>
    <v-code :code="exampleCollapseCode" template language="html"></v-code>
    <v-code :code="exampleCollapseCode" script language="js"></v-code>
  </section>

  <section>
    <h4>Example accordion</h4>
    <div class="example">
      <p>
        Turn collapse components to accordion by wrapping them with <code>v-accordion</code>
        component. In accordion mode only one item can be open at a time.
      </p>
      <example-collapse-accordion></example-collapse-accordion>
    </div>
    <v-code
      :code="exampleCollapseAccordionCode"
      template
      language="html"
    ></v-code>
    <v-code :code="exampleCollapseAccordionCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleCollapse from "./examples/ExampleCollapse.vue";
import ExampleCollapseAccordion from "./examples/ExampleCollapseAccordion.vue";
import exampleCollapseCode from "./examples/ExampleCollapse.vue?raw";
import exampleCollapseAccordionCode from "./examples/ExampleCollapseAccordion.vue?raw";

export default {
  components: {
    ExampleCollapse,
    ExampleCollapseAccordion,
  },
  setup() {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Boolean"],
        default: "undefined",
        description:
          "Setting v-model to <code>true</code> shows collapsible element, <code>false </code>value hides it",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description: "Slot for content that is collapsed",
      },
    ]);

    let components = ref([
      {
        prop: "v-button-collapse",
        description: "Optional version of <code>v-button</code> that has indicator build in and automatically toggles attached <code>v-model</code> on click. It uses the same props as <code>v-button</code> as well as props of <code>v-chevron</code>. Use <code>v-button-collapse</code> for minimal setup or normal <code>v-button</code> for more customizing options.",
      },
    ]);

    return {
      reference,
      slots,
      components,
      exampleCollapseCode,
      exampleCollapseAccordionCode,
    };
  },
};
</script>

<style scoped>
</style>
