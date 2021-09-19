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
    <pre>
      <code class="language-html">
&lt;v-dropdown
  :placement=&quot;example.placement&quot;
  :offset-x=&quot;+example.offsetX&quot;
  :offset-y=&quot;+example.offsetY&quot;
  :no-flip=&quot;example.noFlip&quot;
  :auto-close-menu=&quot;example.autoCloseMenu&quot;
  :transition=&quot;example.transition&quot;
  @state:opened=&quot;
    example.events.unshift({ ev: 'state:opened', data: $event })
  &quot;
  @state:closed=&quot;
    example.events.unshift({ ev: 'state:closed', data: $event })
  &quot;
&gt;
  &lt;template #activator&gt;
    &lt;v-button&gt;Dropdown menu&lt;/v-button&gt;
  &lt;/template&gt;
  &lt;v-card width=&quot;320px&quot; style-card=&quot;shadow&quot;&gt;
    &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;Menu item&lt;/v-dropdown-menu-item&gt;
    &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;Menu item 2&lt;/v-dropdown-menu-item&gt;
    &lt;v-dropdown-header&gt;Menu header&lt;/v-dropdown-header&gt;
    &lt;v-dropdown-menu-item active tag=&quot;button&quot;&gt;Menu item 3&lt;/v-dropdown-menu-item&gt;
    &lt;v-dropdown-menu-item disabled tag=&quot;button&quot;&gt;Menu item 4&lt;/v-dropdown-menu-item&gt;
    &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;Menu item 5&lt;/v-dropdown-menu-item&gt;
  &lt;/v-card&gt;
&lt;/v-dropdown&gt;

&lt;v-dropdown
  :placement=&quot;example.placement&quot;
  :offset-x=&quot;+example.offsetX&quot;
  :offset-y=&quot;+example.offsetY&quot;
  :no-flip=&quot;example.noFlip&quot;
  :auto-close-menu=&quot;example.autoCloseMenu&quot;
  :transition=&quot;example.transition&quot;
  @state:opened=&quot;
    example.events.unshift({ ev: 'state:opened', data: $event })
  &quot;
  @state:closed=&quot;
    example.events.unshift({ ev: 'state:closed', data: $event })
  &quot;
  class=&quot;ml-2&quot;
&gt;
  &lt;template #activator&gt;
    &lt;v-button&gt;Dropdown datepicker&lt;/v-button&gt;
  &lt;/template&gt;
  &lt;template #default=&quot;{ hide }&quot;&gt;
    &lt;v-card width=&quot;320px&quot; style-card=&quot;shadow&quot; class=&quot;p-2&quot;&gt;
      &lt;v-date-picker
        v-model=&quot;example.date&quot;
        adjacent-months
        @state:done=&quot;hide&quot;
      &gt;&lt;/v-date-picker&gt;
    &lt;/v-card&gt;
  &lt;/template&gt;
&lt;/v-dropdown&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleDropdown from "./examples/ExampleDropdown.vue"

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
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
