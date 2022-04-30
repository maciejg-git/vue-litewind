<template>
  <h3>Dropdown</h3>
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
    <table-reference-basic :items="events"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots"></table-reference-basic>

    <h6>Components</h6>
    <p></p>
    <table-reference-basic :items="components"></table-reference-basic>
  </section>

  <section id="example">
    <h4>Example - simple dropdown</h4>
    <div class="example">
      <example-dropdown-simple></example-dropdown-simple>
    </div>
    <v-code :code="exampleDropdownSimpleCode" template language="html"></v-code>
  </section>

  <section id="example">
    <h4>Example</h4>
    <div class="example">
      <example-dropdown></example-dropdown>
    </div>
    <v-code :code="exampleDropdownCode" template language="html"></v-code>
    <v-code :code="exampleDropdownCode" script language="js"></v-code>
  </section>

  <section id="example">
    <h4>Example - context dropdown</h4>
    <div class="example">
      <example-dropdown-context></example-dropdown-context>
    </div>
    <v-code :code="ExampleDropdownContextCode" template language="html"></v-code>
    <v-code :code="ExampleDropdownContextCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleDropdown from "./examples/ExampleDropdown.vue"
import exampleDropdownCode from "./examples/ExampleDropdown.vue?raw"
import ExampleDropdownSimple from "./examples/ExampleDropdownSimple.vue"
import exampleDropdownSimpleCode from "./examples/ExampleDropdownSimple.vue?raw"
import ExampleDropdownContext from "./examples/ExampleDropdownContext.vue"
import ExampleDropdownContextCode from "./examples/ExampleDropdownContext.vue?raw"

export default {
  components: {
    ExampleDropdown,
    ExampleDropdownSimple,
    ExampleDropdownContext,
  },
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
        prop: "placement",
        type: ["String"],
        default: "bottom-start",
        description:
          "Initial placement of dropdown content. See valid values in <a href='https://popper.js.org/docs/v2/constructors/' class='link'>Popperjs documentation</a>",
      },
      {
        prop: "offsetX",
        type: ["Number"],
        default: "0",
        description:
          "Offset of dropdown relative to reference element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
      },
      {
        prop: "offsetY",
        type: ["Number"],
        default: "0",
        description:
          "Offset of dropdown relative to reference element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
      },
      {
        prop: "no-flip",
        type: ["Boolean"],
        default: "false",
        description:
          "Allows fliping dropdown to opposite placement if outside of current view",
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
        default: "fade",
        description:
          "By default showing or hiding dropdown uses fading animation. Set this prop to empty string to disable animation",
      },
      {
        prop: "name",
        type: ["String"],
        default: "dropdown",
        description: "Name of the component",
      },
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
        prop: "state:opened",
        description: "Emitted after dropdown is opened",
      },
      {
        prop: "state:closed",
        description: "Emitted after dropdown is closed",
      },
    ]);

    let slots = ref([
      {
        prop: "reference",
        description: "Slot for button that activates dropdown. Dropdown is positioned relative to element in this slot.",
      },
      {
        prop: "default",
        description:
          "Slot for dropdown content. <p class='mt-4'>Slot props: <code class='code-word'>hide()</code></p>",
      },
    ]);

    let components = ref([
      {
        prop: "v-dropdown-menu-item",
        description: "Single menu item",
      },
      {
        prop: "v-button-dropdown",
        description: "Optional version of <code>v-button</code> that has reactive indicator build in. It uses the same props as normal <code>v-button</code> as well as triangle and icon props of <code>v-chevron</code>",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
      components,
      exampleDropdownCode,
      exampleDropdownSimpleCode,
      ExampleDropdownContextCode,
    };
  },
};
</script>

<style scoped>
</style>
