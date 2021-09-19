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
    <h4>Example</h4>
    <div class="example">
      <example-chevron></example-chevron>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleChevron from "./examples/ExampleChevron.vue"

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
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
