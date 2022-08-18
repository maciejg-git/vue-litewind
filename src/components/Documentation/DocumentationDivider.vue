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
      <example name="ExampleDivider" :script="false"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { styleProps } from "./shared-props"

export default {
  setup(props) {
    let reference = ref([
      ...styleProps(),
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
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
