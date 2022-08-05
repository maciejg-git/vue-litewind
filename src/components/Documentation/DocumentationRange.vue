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
import exampleRangeCode from "./examples/ExampleRange.vue?raw"
import { styleProps, formProps } from "./shared-props"

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Number", "String"],
        default: "undefined",
        description: "Range v-model",
      },
      ...formProps(),
      ...styleProps(),
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
