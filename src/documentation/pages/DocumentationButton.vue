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
      <example name="ExampleButtonSimple" auto-show-code></example>
    </div>
    <div class="example">
      <example name="ExampleButtonSize" auto-show-code></example>
    </div>
    <div class="example">
      <example name="ExampleButtonVariant" auto-show-code></example>
    </div>
    <div class="example">
      <example name="ExampleButtonStyle" auto-show-code></example>
    </div>
    <div class="example">
      <example name="ExampleButtonIcon" auto-show-code></example>
    </div>
    <div class="example">
      <example name="ExampleButtonBlock" auto-show-code></example>
    </div>
    <div class="example">
      <example name="ExampleButtonDisabled" auto-show-code></example>
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
