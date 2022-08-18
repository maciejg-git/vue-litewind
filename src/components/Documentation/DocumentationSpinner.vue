<template>
  <h3>Spinner</h3>
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
      <example name="ExampleSpinner" :script="false"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { styleProps } from "./shared-props"

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "type",
        type: ["String"],
        default: "'border'",
        description: "Valid values are <code class='code-text'>'border'</code> for border spinner or <code class='code-text'>'svg'</code> for SVG spinner.",
      },
      {
        prop: "icon",
        type: ["String", "Object"],
        default: "undefined",
        description: "Icon to use instead of border or SVG spinner",
      },
      ...styleProps(),
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
