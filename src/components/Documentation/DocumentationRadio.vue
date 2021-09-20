<template>
  <h3>Radio</h3>
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
      <example-radio></example-radio>
    </div>
    <v-code :code="exampleRadioCode" template language="html"></v-code>
    <v-code :code="exampleRadioCode" script language="js"></v-code>
  </section>

  <section>
    <h4>Radio group</h4>
    <div class="example">
      <example-radio-group></example-radio-group>
    </div>
    <v-code :code="exampleRadioGroupCode" template language="html"></v-code>
    <v-code :code="exampleRadioGroupCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import ExampleRadio from "./examples/ExampleRadio.vue"
import ExampleRadioGroup from "./examples/ExampleRadioGroup.vue"
import exampleRadioCode from "./examples/ExampleRadio.vue?raw"
import exampleRadioGroupCode from "./examples/ExampleRadioGroup.vue?raw"

export default {
  components: {
    ExampleRadio,
    ExampleRadioGroup,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Radio v-model",
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
        default: "radio",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-radio",
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
      exampleRadioCode,
      exampleRadioGroupCode,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
