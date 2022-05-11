<template>
  <h3>Divider</h3>
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
      <example-divider></example-divider>
    </div>
    <v-code :code="exampleDividerCode" template language="html"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleDivider from "./examples/ExampleDivider.vue"
import exampleDividerCode from "./examples/ExampleDivider.vue?raw"
import { styleProps } from "./shared-props"

export default {
  components: {
    ExampleDivider,
  },
  setup(props) {
    let reference = ref([
      ...styleProps("table"),
    ]);

    let styles = ref([
      {
        prop: "style-divider",
        description: "Main divider element",
      },
    ]);

    return {
      reference,
      styles,
      exampleDividerCode,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
