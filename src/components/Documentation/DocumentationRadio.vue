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

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->
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
import { ref } from "vue";
import exampleRadioCode from "./examples/ExampleRadio.vue?raw"
import exampleRadioGroupCode from "./examples/ExampleRadioGroup.vue?raw"
import { styleProps, formProps } from "./shared-props"

export default {
  setup() {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Radio v-model",
      },
      {
        prop: "label",
        type: ["String"],
        default: "empty string",
        description: "Radio label",
      },
      ...formProps(),
      ...styleProps(),
    ]);

    let styles = ref([
      {
        prop: "style-radio",
        description: "Main input element",
      },
      {
        prop: "style-label",
        description: "Input label element",
      },
    ]);

    let events = ref([
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
