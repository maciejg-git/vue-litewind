<template>
  <h3>Input</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

    <h6>Events</h6>
    <table-reference-basic :items="reference.events" reference="event" />

    <h6>Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <section>
    <h4>Example - simple input</h4>
    <div class="example">
      <example name="ExampleInputSimple"></example>
    </div>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleInput"></example>
    </div>
  </section>

  <section>
    <h4>Example - prepend, append and icon slots</h4>
    <div class="example">
      <example name="ExampleInputSlot"></example>
    </div>
  </section>

  <section>
    <h4>Example - alternative styles</h4>
    <div class="example">
      <example name="ExampleInputStyles" :script="false"></example>
    </div>
  </section>

  <section>
    <h4>Example - group styling</h4>
    <p>Input elements can be styled depending on the state of top wrapper element with tailwind <code class="code-text">group-*</code> modifiers. In the example clear button appears on hover and icon appears after input is focused.</p>
    <div class="example">
      <example name="ExampleInputStyling"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "./components-documentation/vInput.json"

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
