<template>
  <h3>Input</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Events</h6>
    <p></p>
    <table-reference-basic :items="events"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-input></example-input>
    </div>
    <v-code :code="exampleInputCode" template language="html"></v-code>
    <v-code :code="exampleInputCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleInput from "./examples/ExampleInput.vue"
import exampleInputCode from "./examples/ExampleInput.vue?raw"
import { styleProps } from "./shared-props"

export default {
  components: {
    ExampleInput,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Input v-model",
      },
      {
        prop: "icon",
        type: ["String"],
        default: "empty string",
        description:
          "Adds icon to input element. Valid value is the same as in v-icon components",
      },
      {
        prop: "clearable",
        type: ["Boolean"],
        default: "false",
        description:
          "Makes input clearable",
      },
      {
        prop: "state",
        type: ["String", "Boolean"],
        default: "empty string",
        description:
          "State of input validity. Supported values are 'valid' (or true), 'invalid' (or false) or 'empty string' (or null) for default state",
      },
      ...styleProps("input"),
    ]);

    let styles = ref([
      {
        prop: "style-input",
        description: "Main input element",
      },
    ]);

    let events = ref([
      {
        prop: "update:modelValue",
        description: "Update v-model",
      },
    ]);

    return {
      reference,
      styles,
      events,
      exampleInputCode,
    };
  },
};
</script>

<style scoped>
</style>
