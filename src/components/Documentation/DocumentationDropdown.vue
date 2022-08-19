<template>
  <h3>Dropdown</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <h6>Events</h6>
    <table-reference-basic :items="events" reference="event" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />

    <h6>Components</h6>
    <table-reference-basic :items="components" reference="component" />

    <h6>Functions</h6>
    <table-reference-basic :items="functions" reference="function" />
  </section>

  <section id="example">
    <h4>Example - simple dropdown</h4>
    <div class="example">
      <example name="ExampleDropdownSimple" :script="false"></example>
    </div>
  </section>

  <section id="example">
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleDropdown"></example>
    </div>
  </section>

  <section id="example">
    <h4>Example - context dropdown</h4>
    <p>
      To make dropdown component exposes
      <code class="code-text">
        showContextDropdown($event, { contextData })
      </code>
      function.
    </p>
    <div class="example">
      <example name="ExampleDropdownContext"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { popperProps, styleProps } from "./shared-props";

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "modelValue",
        type: ["Boolean"],
        default: "false",
        description:
          "Set it to true/false to programatically show or hide dropdown content. Model is optional if dropdown is activated from reference slot",
      },
      {
        prop: "trigger",
        type: ["String"],
        default: "click",
        description:
          "How to trigger dropdown. Valid triggers are <code class='code-text'>'click'</code>, <code class='code-text'>'focus'</code> and <code class='code-text'>'hover'</code>",
      },
      {
        prop: "auto-close-menu",
        type: ["Boolean"],
        default: "false",
        description:
          "If true clicking any dropdown menu item automatically closes dropdown",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade-m",
        description:
          "Sets animation effect when showing or hiding dropdown. Valid values are: 'fade-f', 'fade-m' and 'fade-s'. Empty string disables animations.",
      },
      ...popperProps,
      ...styleProps(),
    ]);

    let styles = ref([
      {
        prop: "style-menu-item",
        description: "Style of menu item",
      },
      {
        prop: "style-menu-item-header",
        description: "Style of menu header",
      },
    ]);

    let events = ref([
      {
        event: "state:opened",
        description: "Emitted after dropdown is opened",
      },
      {
        event: "state:closed",
        description: "Emitted after dropdown is closed",
      },
    ]);

    let slots = ref([
      {
        slot: "reference",
        description:
          "Slot for button that activates dropdown. Dropdown is positioned relative to element in this slot.",
      },
      {
        slot: "default",
        description:
          "Slot for dropdown content. <p class='mt-4'>Slot props: <code class='code-word'>hide()</code></p>",
      },
    ]);

    let components = ref([
      {
        component: "v-dropdown-menu-item",
        description: "Single menu item",
      },
      {
        component: "v-button-dropdown",
        description:
          "Optional version of <code class='code-text'>v-button</code> that has reactive indicator build in. It uses the same props as normal <code class='code-text'>v-button</code> as well as triangle and icon props of <code class='code-text'>v-chevron</code>",
      },
    ]);

    let functions = ref([
      {
        function: "showContextDropdown($event, contextData: Object)",
        description:
          "Shows context menu. Context data is available in slot props of default slot",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
      functions,
      components,
    };
  },
};
</script>

<style scoped></style>
