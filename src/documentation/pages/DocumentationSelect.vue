<template>
  <h3>Select</h3>
  <links-github-header component="vSelect" />

  <section>
    <h4 id="SelectReference">Reference</h4>
    <p class="my-10">
      This component also allows props of
      <code class="code-text">v-input</code>
      . See documentation here.
    </p>
    <table-reference :items="reference.props" />

    <h6 id="SelectEvents">Events</h6>
    <p class="my-10">
      This component also emits events of
      <code class="code-text">v-input</code>
      . See documentation here.
    </p>
    <table-reference-basic :items="reference.events" reference="event" />

    <h6 id="SelectSlots">Slots</h6>
    <p class="my-10">
      This component also allows slots of
      <code class="code-text">v-input</code>
      . See documentation here.
    </p>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="SelectNotes">Notes</h4>
    <ul class="flex flex-col gap-y-7 mt-6">
      <li>
        <header class="font-semibold text-lg dark:text-text-200 mb-2">
          Autocomplete
        </header>
        Select allows autocomplete functionality to search for options. Enable autocomplete mode with <code class="code-text">autocomplete</code> prop or use <code class="code-text">v-autocomplete</code> component. In autocomplete mode <code class="code-text">no-filter</code>, <code class="code-text">no-pagination</code> and <code class="code-text">is-loading</code> props can be used when requesting data from API.
      </li>
    </ul>
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="ExampleSelectSimple">Example - simple select</h4>
    <div class="example">
      <example name="ExampleSelectSimple"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleSelectMultivalue">Example - simple select (multiple)</h4>
    <div class="example">
      <example name="ExampleSelectMultivalue"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleAutocomplete">Example - autocomplete</h4>
    <p>
    This example uses <code class="code-text">no-filter</code> prop and simple mock of API request. It does not perform local autocompletion, instead <code class="code-text">items</code> prop is replaced or updated with new set of items after input event.
    </p>
    <div class="example">
      <example name="ExampleAutocomplete"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleAutocompleteMultivalue">Example - autocomplete (multiple with chips)</h4>
    <p>
    Example of multi value autocomplete that uses <code class="code-text">v-chip</code> components to display selected values.
    </p>
    <div class="example">
      <example name="ExampleAutocompleteMultivalue"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleAutocompleteAPIWiki">Example - autocomplete (Wikipedia API)</h4>
    <div class="example">
      <example name="ExampleAutocompleteAPIWiki"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleAutocompleteSlot">Example - autocomplete (customized menu)</h4>
    <p>To customize menu items use <code class="code-text">item</code> slot</p>
    <div class="example">
      <example name="ExampleAutocompleteSlot"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleSelectMultipleMax">Example - select (max multiple limit)</h4>
    <p><code class="code-text">max-multiple</code> prop sets the max number of selected items shown in the input. In the following example <code class="code-text">max-multiple</code> slot is used to show the number of remaining hidden items.</p>
    <div class="example">
      <example name="ExampleSelectMultipleMax"></example>
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
