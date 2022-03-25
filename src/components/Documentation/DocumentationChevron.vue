<template>
  <h3>Chevron</h3>
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
    <h4>Notes</h4>
    <p><code>v-chevron</code> rotates chevron/triangle or any icon depending on switch prop. It is used internally by dropdown, collapse etc</p>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-chevron></example-chevron>
    <v-code :code="exampleChevronCode" template language="html"></v-code>
    <v-code :code="exampleChevronCode" script language="js"></v-code>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleChevron from "./examples/ExampleChevron.vue"
import exampleChevronCode from "./examples/ExampleChevron.vue?raw"

export default {
  components: {
    ExampleChevron,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "initial",
        type: ["String"],
        default: "down",
        description: "Initial direction of chevron/triangle. Valid values are: 'down', 'left' ,'right' and 'up'",
      },
      {
        prop: "rotate180",
        type: ["Boolean"],
        default: "false",
        description: "If true rotates chevron 180 degrees. Default is 90 degree",
      },
      {
        prop: "triangle",
        type: ["Boolean"],
        default: "false",
        description: "Use filled triangle instead of chevron",
      },
      {
        prop: "counter-clockwise",
        type: ["Boolean"],
        default: "false",
        description: "Rotate chevron/triangle counter-clockwise",
      },
      {
        prop: "switch",
        type: ["Boolean"],
        default: "false",
        description:
          "Flick this to rotate chevron/triangle to initial/rotated position",
      },
      {
        prop: "icon",
        type: ["String"],
        default: "empty string",
        description:
          "Name of the icon to use instead of default chevron/triangle",
      },
      {
        prop: "name",
        type: ["String"],
        default: "chevron",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-chevron",
        description: "Chevron element",
      },
    ]);

    return {
      reference,
      styles,
      exampleChevronCode,
    };
  },
};
</script>

<style scoped>
</style>
