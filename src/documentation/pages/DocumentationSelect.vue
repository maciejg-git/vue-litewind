<template>
  <h3>Select</h3>
  <links-github-header component="vSelect" />

  <section>
    <h4>Reference</h4>
    <p class="my-10">
      This component also allows props of
      <code class="code-text">v-input</code>
      . See documentation here.
    </p>
    <table-reference :items="reference.props" />

    <h6>Events</h6>
    <p class="my-10">
      This component also emits events of
      <code class="code-text">v-input</code>
      . See documentation here.
    </p>
    <table-reference-basic :items="reference.events" reference="event" />

    <h6>Slots</h6>
    <p class="my-10">
      This component also allows slots of
      <code class="code-text">v-input</code>
      . See documentation here.
    </p>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <v-divider></v-divider>

  <section>
    <h4>Notes</h4>
    <ul class="flex flex-col gap-y-7 mt-6">
      <li>
        <header class="font-semibold text-lg mb-2">
          <span>#</span>
          Autocomplete
        </header>
        Select allows autocomplete functionality to search for options. Enable autocomplete mode with <code class="code-text">autocomplete</code> prop or use <code class="code-text">v-autocomplete</code> component. In autocomplete mode <code class="code-text">no-filter</code>, <code class="code-text">no-pagination</code> and <code class="code-text">is-loading</code> props can be used when requesting data from API.
      </li>
    </ul>
  </section>

  <v-divider></v-divider>

  <section>
    <h4>Example - simple select</h4>
    <div class="example">
      <example name="ExampleSelectSimple"></example>
    </div>
  </section>

  <section>
    <h4>Example - simple select (multi value)</h4>
    <div class="example">
      <example name="ExampleSelectMultivalue"></example>
    </div>
  </section>

  <section>
    <h4>Example - autocomplete</h4>
    <p>
    This example uses <code class="code-text">no-filter</code> prop and simple mock of API request. It does not perform local autocompletion, instead <code class="code-text">items</code> prop can be replaced or updated with new set of items after input event.
    </p>
    <div class="example">
      <example name="ExampleAutocomplete"></example>
    </div>
  </section>

  <section>
    <h4>Example - autocomplete (multi value with chips)</h4>
    <p>
    Example of multi value autocomplete that has <code class="code-text">v-chip</code> components as selected values.
    </p>
    <div class="example">
      <example name="ExampleAutocompleteMultivalue"></example>
    </div>
  </section>

  <section>
    <h4>Example - autocomplete (radio browser API)</h4>
    <div class="example">
      <example name="ExampleAutocompleteAPI"></example>
    </div>
  </section>

  <section>
    <h4>Example - autocomplete (customized menu)</h4>
    <p>To customize menu items use <code class="code-text">item</code> slot</p>
    <div class="example">
      <example name="ExampleAutocompleteSlot"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vSelect.json"

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
