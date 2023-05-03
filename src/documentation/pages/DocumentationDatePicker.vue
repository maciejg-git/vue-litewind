<template>
  <h3>Date Picker</h3>
  <links-github-header component="vDatePicker" />

  <section>
    <h4 id="DatepickerReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="DatepickerEvents">Events</h6>
    <table-reference-basic :items="reference.events" reference="event" />

    <h6 id="DatepickerSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <section>
    <h4 id="ExampleDatepickerModel">v-model</h4>
    <span class="font-bold">Type</span>
    :
    <code class="code-word">String</code>
    <code class="code-word">Array</code>
    <p>
      v-model is used to return date after selection. v-model can be
      <code class="code-text">Array</code>
      or
      <code class="code-text">String</code>
      depending on selection mode. In range mode v-model returns
      <code class="code-text">Array</code>
      of two
      <code class="code-text">String</code>
      . In single mode v-model returns
      <code class="code-text">String</code>
      . Date is in
      <code class="code-text">YYYY-MM-DD</code>
      format.
    </p>
    <div class="example">
      <example name="ExampleDatepickerModel"></example>
    </div>
  </section>
  <section>
    <h4 id="ExampleDatepicker">Example</h4>
    <div class="example">
      <example name="ExampleDatepicker"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleDatepickerDropdown">Example - datepicker in dropdown</h4>
    <div class="example">
      <example name="ExampleDatepickerDropdown"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleDatepickerSlot">Example - datepicker slots</h4>
    <div class="example">
      <example name="ExampleDatepickerSlot"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vDatePicker.json"

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
