<template>
  <h3>Select</h3>

  <section>
    <h4>Reference</h4>
    <p class="my-10">
      This component also allows props of
      <code class="code-text">v-input</code>
      . See documentation here.
    </p>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <p class="my-10">
      This component also allows styling props of
      <code class="code-text">v-input</code>
      . See documentation here.
    </p>
    <table-reference-basic :items="styles" />

    <h6>Events</h6>
    <p class="my-10">
      This component also emits events of
      <code class="code-text">v-input</code>
      . See documentation here.
    </p>
    <table-reference-basic :items="events" reference="event" />

    <h6>Slots</h6>
    <p class="my-10">
      This component also allows slots of
      <code class="code-text">v-input</code>
      . See documentation here.
    </p>
    <table-reference-basic :items="slots" reference="slot" />
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
    <h4>Example - simple multi value select</h4>
    <div class="example">
      <example name="ExampleSelectMultivalue"></example>
    </div>
  </section>

  <section>
    <h4>Example - autcomplete (remote source)</h4>
    <div class="example">
      <example name="ExampleAutocomplete"></example>
    </div>
  </section>

  <section>
    <h4>Example - multi value autocomplete</h4>
    <div class="example">
      <example name="ExampleAutocompleteMultivalue"></example>
    </div>
  </section>

  <section>
    <h4>Example - customized menu</h4>
    <p>To customize menu items use <code class="code-text">item</code> slot</p>
    <div class="example">
      <example name="ExampleAutocompleteSlot"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { sharedProps, popperProps, styleProps, formProps } from "./shared-props";

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
        description:
          "Items to display. Can be `array` of `strings` or `objects` or mixed. Objects should at least have `text` and `value` properties. If `objects` have additional properties you can display them using `item` slot",
      },
      {
        prop: "item-text",
        type: ["String"],
        default: "'text'",
        description: "Set name of the property of items’s text value",
      },
      {
        prop: "item-value",
        type: ["String"],
        default: "'value'",
        description: "Set name of the property of items’s value",
      },
      {
        prop: "multi-value",
        type: ["Boolean"],
        default: "false",
        description:
          "Allows selecting multiple values",
      },
      {
        prop: "multi-value-display",
        type: ["String"],
        default: "text",
        description:
          "This props allows to choose how to display values in `multi-value` mode. Valid values are 'text' or 'chips'",
      },
      {
        prop: "autocomplete",
        type: ["Boolean"],
        default: "false",
        description:
          "Allows filtering select items based on inputs value. You can also use v-autocomplete which is wrapper of v-select with this prop enabled by default",
      },
      {
        prop: "is-loading",
        type: ["Boolean"],
        default: "false",
        description:
          "Use it whenever asynchronously updating items prop. Required.",
      },
      {
        prop: "filter-keys",
        type: ["Array"],
        default: "[]",
        description:
          "By default text property is used to filter items. You can set different properties by adding them to this prop.",
      },
      {
        prop: "no-filter",
        type: ["Boolean"],
        default: "false",
        description:
          "Do not use internal filter in `autocomplete` mode. You should provide filtered items by updating `items` prop",
      },
      {
        prop: "no-pagination",
        type: ["Boolean"],
        default: "false",
        description:
          "Do no use internal pagination. You can paginate items by updating `items` prop",
      },
      {
        prop: "items-per-page",
        type: ["Number"],
        default: "10",
        description:
          "Amounts of items to display per page, 0 = all items on single page. Ignored if `no-pagination` is used",
      },
      {
        prop: "empty-data-message",
        type: ["String"],
        default: "No data available",
        description:
          "Message to display inside menu when `items` array is empty",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade",
        description: "Sets animation effect when showing or hiding autocomplete menu. Valid values are: 'fade' or `empty string` to disable animations. Animation speed can be set in `--autocomplete-transition-duration` css variable.",
      },
      ...popperProps,
      ...formProps({ icon: true, clearable: true }),
      ...styleProps(),
      ...sharedProps(),
    ]);

    let styles = ref([
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
        description:
          "Fired when next page is displayed (scroll reach end of dropdown menu)",
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
          "Slot for menu item. Slot props: `text`, `value`, `item`, `inputValue`",
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

<style scoped></style>
