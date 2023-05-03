<template>
  <h3>Button</h3>
  <links-github-header component="vButton" />

  <section>
    <h4 id="ButtonReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="ButtonSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <section>
    <h4 id="ButtonExamples">Examples</h4>
    <div class="example">
      <example name="ExampleButtonSimple"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonSize"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonVariant"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonStyle"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonIcon"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonBlock"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonDisabled"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vButton.json"

export default {
  setup() {
    let reference = reactive(componentDocumentation)

    return {
      reference,
    };
  },
};
</script>

<style scoped></style>
