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
    <h4>Example</h4>
    <div class="example">
      <example-dropdown></example-dropdown>
    </div>
    <v-code :code="exampleDropdownCode" template language="html"></v-code>
    <v-code :code="exampleDropdownCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleDropdown from "./examples/ExampleDropdown.vue"
import exampleDropdownCode from "./examples/ExampleDropdown.vue?raw"

export default {
  components: {
    ExampleDropdown,
  },
  setup(props) {
    let reference = ref([
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
          "Offset of dropdown relative to activator element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
      },
      {
        prop: "offsetY",
        type: ["Number"],
        default: "0",
        description:
          "Offset of dropdown relative to activator element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
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
        prop: "activator",
        description: "Slot for button or link that activates dropdown",
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
    ]);

    return {
      reference,
      styles,
      events,
      slots,
      components,
      exampleDropdownCode,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
