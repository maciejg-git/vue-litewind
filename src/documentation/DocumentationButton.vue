<template>
  <h3>Button</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

    <h6>Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleButtonSimple" :script="false"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonSize" :script="false"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonVariant" :script="false"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonStyle" :script="false"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonIcon" :script="false"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonBlock" :script="false"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonDisabled" :script="false"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "./components-documentation/vButton.json"

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
