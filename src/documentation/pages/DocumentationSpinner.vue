<template>
  <h3>Spinner</h3>
  <links-github-header component="vSpinner" />

  <section>
    <h4 id="SpinnerReference">Reference</h4>
    <table-reference :items="reference.props" />
  </section>

  <section>
    <h4 id="SpinnerExample">Example</h4>
    <div class="example">
      <example name="ExampleSpinner"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vSpinner.json"

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
