<template>
  <h3>Divider</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleDivider" :script="false"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "./components-documentation/vDivider.json"

export default {
  setup() {
    let reference = reactive(componentDocumentation)

    return {
      reference,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
