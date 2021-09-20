<template>
  <h3>Spinner</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-spinner></example-spinner>
    </div>
    <v-code :code="exampleSpinnerCode" template language="html"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleSpinner from "./examples/ExampleSpinner.vue"
import exampleSpinnerCode from "./examples/ExampleSpinner.vue?raw"

export default {
  components: {
    ExampleSpinner,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "thickness",
        type: ["String"],
        default: "0.15",
        description: "Thickness of spinner in em units",
      },
      {
        prop: "speed",
        type: ["String"],
        default: "0.75",
        description: "Speed of spinner in seconds",
      },
      {
        prop: "name",
        type: ["String"],
        default: "spinner",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-spinner",
        description: "Main spinner element",
      },
    ]);

    let events = ref([
      {
        event: "-",
        description: "Update v-model",
      },
    ]);

    let slots = ref([
      {
        slot: "-",
        description: "This component does not provide any slots.",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
      exampleSpinnerCode,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
