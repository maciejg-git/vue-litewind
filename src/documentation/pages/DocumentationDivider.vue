<template>
  <h3>Divider</h3>
  <links-github-header component="vDivider" />

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleDivider"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vDivider.json"

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
</style>
