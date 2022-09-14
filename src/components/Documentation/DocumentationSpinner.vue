<template>
  <h3>Spinner</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleSpinner" :script="false"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { sharedProps, styleProps } from "./shared-props"

export default {
  setup() {
    let reference = ref([
      {
        prop: "type",
        type: ["String"],
        default: "'border'",
        description: "Valid values are 'border' for border spinner or 'svg' for SVG spinner.",
      },
      {
        prop: "icon",
        type: ["String", "Object"],
        default: "undefined",
        description: "Icon to use instead of border or SVG spinner",
      },
      ...styleProps(),
      ...sharedProps(),
    ]);

    let styles = ref([
      {
        prop: "style-spinner",
        description: "Main spinner element",
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
