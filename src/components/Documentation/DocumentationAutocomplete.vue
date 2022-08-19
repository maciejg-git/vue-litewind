<template>
  <h3>Autocomplete</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <h6>Events</h6>
    <table-reference-basic :items="events" reference="event" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />
  </section>

  <section>
    <h4>Example - simple autocomplete</h4>
    <div class="example">
      <example name="ExampleAutocompleteSimple"></example>
    </div>
  </section>

  <section>
    <h4>Example - remote source</h4>
    <div class="example">
      <example name="ExampleAutocomplete"></example>
    </div>
  </section>

  <section>
    <h4>Example - item slot</h4>
    <p>
      You can customize menu items by using item slot.
    </p>
    <div class="example">
      <example name="ExampleAutocompleteSlot"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { popperProps, styleProps, formProps } from "./shared-props"

export default {
  setup() {
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
        description: "Do no use internal pagination. Useful when data is being paginated server side",
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
        prop: "empty-data-message",
        type: ["String"],
        default: "No data available",
        description: "Message to display inside menu when <code class='code-text'>items</code> array is empty",
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
        prop: "style-menu",
        description: "Menu element",
      },
      {
        prop: "style-item",
        description: "Menu item element",
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
    };
  },
};
</script>

<style scoped>
</style>
