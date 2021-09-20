<template>
  <h3>Form text helper</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-form-text></example-form-text>
    </div>
    <v-code :code="exampleFormTextCode" template language="html"></v-code>
    <v-code :code="exampleFormTextCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleFormText from "./examples/ExampleFormText.vue"
import exampleFormTextCode from "./examples/ExampleFormText.vue?raw"

export default {
  components: {
    ExampleFormText,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "state",
        type: ["String"],
        default: "empty string",
        description:
          "Current state. Most useful if form text uses the same state as input.",
      },
      {
        prop: "inline",
        type: ["Boolean"],
        default: "false",
        description: "Inline-flex version of form text. Default is flex.",
      },
      {
        prop: "visible-states",
        type: ["String"],
        default: "default,invalid,valid",
        description:
          "List of coma seperated states. If state is one of those states then form text is visible",
      },
      {
        prop: "name",
        type: ["String"],
        default: "form-text",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-form-text",
        description: "Text element",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description:
          "Slot for text. Slot props: <code class='code-word'>state</code>",
      },
    ]);

    return {
      reference,
      styles,
      slots,
      exampleFormTextCode,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
