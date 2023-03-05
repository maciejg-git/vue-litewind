<template>
  <h3>Form text</h3>
  <links-github-header component="vFormText" />

  <section>
    <h4>Notes</h4>
    <p class="mt-6">
      <code class="code-text">v-form-text</code> is used by form components to display validation messages. See Form Validation for examples.
    </p>
  </section>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

    <h6>Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vFormText.json"

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
