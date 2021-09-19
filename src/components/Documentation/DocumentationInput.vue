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
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import ExampleInput from "./examples/ExampleInput.vue"

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
        prop: "type",
        type: ["String"],
        default: "text",
        description: "Type of input element eg. text, password, search etc",
      },
      {
        prop: "state",
        type: ["String", "Boolean"],
        default: "empty string",
        description:
          "State of input validity. Supported values are 'valid' (or true), 'invalid' (or false) or 'empty string' (or null) for default state",
      },
      {
        prop: "name",
        type: ["String"],
        default: "input",
        description: "Name of the component",
      },
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
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
