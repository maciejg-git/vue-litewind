<template>
  <h3>Autocomplete</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Events</h6>
    <p></p>
    <table-reference-basic :items="events" reference="event"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots" reference="slot"></table-reference-basic>
  </section>

  <section>
    <h4>Example - simple autocomplete</h4>
    <div class="example">
      <example-autocomplete-simple></example-autocomplete-simple>
    </div>
    <v-code :code="ExampleAutocompleteSimpleCode" template language="html"></v-code>
    <v-code :code="ExampleAutocompleteSimpleCode" script language="js"></v-code>
  </section>

  <section>
    <h4>Example - remote source</h4>
    <div class="example">
      <example-autocomplete></example-autocomplete>
    </div>
    <v-code :code="ExampleAutocompleteCode" template language="html"></v-code>
    <v-code :code="ExampleAutocompleteCode" script language="js"></v-code>
  </section>

  <section>
    <h4>Example - item slot</h4>
    <div class="example">
      <example-autocomplete-slot></example-autocomplete-slot>
    </div>
    <v-code :code="ExampleAutocompleteSlotCode" template language="html"></v-code>
    <v-code :code="ExampleAutocompleteSlotCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleAutocompleteSimpleCode from "./examples/ExampleAutocompleteSimple.vue?raw"
import ExampleAutocompleteCode from "./examples/ExampleAutocomplete.vue?raw"
import ExampleAutocompleteSlotCode from "./examples/ExampleAutocompleteSlot.vue?raw"
import { popperProps, styleProps, formProps } from "./shared-props"

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Autocomplete v-model",
      },
      {
        prop: "items",
        type: ["Array"],
        default: "undefined",
        description: "Items to display. Can be array of strings or objects",
      },
      {
        prop: "item-text",
        type: ["String"],
        default: "'text'",
        description: "Set property of items’s text value",
      },
      {
        prop: "item-value",
        type: ["String"],
        default: "'value'",
        description: "Set property of items’s value",
      },
      {
        prop: "is-loading",
        type: ["Boolean"],
        default: "false",
        description: "Use it whenever asynchronously updating items prop. <span class='font-bold'>Required</span>.",
      },
      {
        prop: "no-filter",
        type: ["Boolean"],
        default: "false",
        description: "Do not use internal filter. Useful when data is being filtered server side",
      },
      {
        prop: "no-pagination",
        type: ["Boolean"],
        default: "false",
        description: "Do no use internal pagination.  Useful when data is being paginated server side",
      },
      {
        prop: "no-loader",
        type: ["Boolean"],
        default: "false",
        description: "Toggles display of loader",
      },
      {
        prop: "items-per-page",
        type: ["Number"],
        default: "10",
        description: "Amounts of items to display per page, 0 = all items on single page. Ignored if <code class='code-text'>no-pagination</code> is used",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade",
        description: "By default showing or hiding dropdown uses fading animation. Set this prop to empty string to disable animation",
      },
      ...popperProps,
      ...formProps({ icon: true, clearable: true }),
      ...styleProps(),
    ]);

    let styles = ref([
      {
        prop: "style-autocomplete",
        description: "Input element",
      },
      {
        prop: "style-dropdown",
        description: "Dropdown element",
      },
      {
        prop: "style-item",
        description: "Dropdown item element",
      },
      {
        prop: "style-match",
        description: "Highlight of matched text",
      },
    ]);

    let events = ref([
      {
        event: "update:page",
        description: "Fired when next page is displayed (scroll reach end of dropdown menu)",
      },
      {
        event: "state:focus",
        description: "Input element recieved focus",
      },
      {
        event: "input:value",
        description: "Fired when input value changes",
      },
      {
        event: "state:opened",
        description: "Dropdown menu opens",
      },
      {
        event: "state:closed",
        description: "Dropdown menu closes",
      },
    ]);

    let slots = ref([
      {
        slot: "item",
        description:
          "Slot for item customization. Slot props: <code class='code-text'>text</code>, <code class='code-text'>value</code>, <code class='code-text'>item</code>, <code class='code-text'>inputValue</code>, <code class='code-text'>highlight(string, match)</code>",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
      ExampleAutocompleteCode,
      ExampleAutocompleteSimpleCode,
      ExampleAutocompleteSlotCode,
    };
  },
};
</script>

<style scoped>
</style>
