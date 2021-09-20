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
        Turn collapse components to accordion by wrapping them with v-accordion
        component.
      </p>
      <example-collapse-accordion></example-collapse-accordion>
    </div>
    <v-code :code="exampleCollapseAccordionCode" template language="html"></v-code>
    <v-code :code="exampleCollapseAccordionCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import ExampleCollapse from "./examples/ExampleCollapse.vue"
import ExampleCollapseAccordion from "./examples/ExampleCollapseAccordion.vue"
import exampleCollapseCode from "./examples/ExampleCollapse.vue?raw"
import exampleCollapseAccordionCode from "./examples/ExampleCollapseAccordion.vue?raw"

export default {
  components: {
    ExampleCollapse,
    ExampleCollapseAccordion,
  },
  setup(props) {
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

    return {
      reference,
      slots,
      exampleCollapseCode,
      exampleCollapseAccordionCode,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
