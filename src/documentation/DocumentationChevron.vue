<template>
  <h3>Chevron</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />
  </section>

  <section>
    <h4>Notes</h4>
    <p class="mt-6">
      <code class="code-text">v-chevron</code>
      rotates chevron/triangle or any icon depending on switch prop. It is used
      internally by dropdown, collapse etc
    </p>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleChevron"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "./components-documentation/vChevron.json"

export default {
  setup(props) {
    let reference = reactive(componentDocumentation)

    return {
      reference,
    };
  },
};
</script>

<style scoped></style>
