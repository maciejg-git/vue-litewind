<template>
  <h3>Divider</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />
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
import { sharedProps, styleProps } from "./shared-props"

export default {
  setup() {
    let reference = ref([
      ...styleProps(),
      ...sharedProps(),
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
