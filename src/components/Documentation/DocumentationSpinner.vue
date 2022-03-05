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
        prop: "type",
        type: ["String"],
        default: "border",
        description: "Valid values are 'border' for border spinner or 'svg' for SVG spinner.",
      },
      {
        prop: "icon",
        type: ["String", "Object"],
        default: "undefined",
        description: "Icon to use instead of border or SVG spinner",
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
