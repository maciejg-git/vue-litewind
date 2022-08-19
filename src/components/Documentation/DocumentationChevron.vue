<template>
  <h3>Chevron</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />
  </section>

  <section>
    <h4>Notes</h4>
    <p><code class="code-text">v-chevron</code> rotates chevron/triangle or any icon depending on switch prop. It is used internally by dropdown, collapse etc</p>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleChevron"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import exampleChevronCode from "./examples/ExampleChevron.vue?raw"
import { styleProps } from "./shared-props"

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "initial",
        type: ["String"],
        default: "'down'",
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
      ...styleProps(),
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
</style>
