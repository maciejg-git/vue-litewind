<template>
  <h3>Autocomplete</h3>
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
      <example-autocomplete></example-autocomplete>
    </div>
    <v-code :code="ExampleAutocompleteCode" template language="html"></v-code>
    <v-code :code="ExampleAutocompleteCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleAutocomplete from "./examples/ExampleAutocomplete.vue"
import ExampleAutocompleteCode from "./examples/ExampleAutocomplete.vue?raw"

export default {
  components: {
    ExampleAutocomplete,
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
      ExampleAutocompleteCode,
    };
  },
};
</script>

<style scoped>
</style>
