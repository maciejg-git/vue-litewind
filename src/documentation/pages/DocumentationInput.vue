<template>
  <h3>Input</h3>
  <links-github-header component="vInput" />

  <section>
    <h4 id="InputReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="InputEvents">Events</h6>
    <table-reference-basic :items="reference.events" reference="event" />

    <h6 id="InputSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <section>
    <h4 id="ExampleInputSimple">Example - simple input</h4>
    <div class="example">
      <example name="ExampleInputSimple"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleInput">Example - props and events</h4>
    <div class="example">
      <example name="ExampleInput"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleInputSlot">Example - prepend, append and icon slots</h4>
    <div class="example">
      <example name="ExampleInputSlot"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleInputStyles">Example - alternative styles</h4>
    <div class="example">
      <example name="ExampleInputStyles"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleInputStyling">Example - group styling</h4>
    <p>Input elements can be styled depending on the state of wrapper element with tailwind <code class="code-text">group-*</code> modifiers. In the example clear button appears on hover and icon appears after input is focused.</p>
    <div class="example">
      <example name="ExampleInputStyling"></example>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vInput.json"

let reference = reactive(componentDocumentation)
</script>

<style scoped></style>
