<template>
  <h3>Range</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-range></example-range>
    </div>
    <v-code :code="exampleRangeCode" template language="html"></v-code>
    <v-code :code="exampleRangeCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleRange from "./examples/ExampleRange.vue"
import exampleRangeCode from "./examples/ExampleRange.vue?raw"

export default {
  components: {
    ExampleRange,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Number", "String"],
        default: "undefined",
        description: "Range v-model",
      },
      {
        prop: "state",
        type: ["String"],
        default: "empty string",
        description:
          "State of input validity. Supported values are 'valid', 'invalid' or 'empty string' for default state",
      },
      {
        prop: "name",
        type: ["String"],
        default: "range",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-range",
        description: "Main input element",
      },
    ]);

    let events = ref([
    ]);

    return {
      reference,
      styles,
      events,
      exampleRangeCode,
    };
  },
};
</script>

<style scoped>
</style>
