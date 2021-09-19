<template>
  <h3>Tabs</h3>
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

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-tabs></example-tabs>
    </div>
    <pre>
      <code class="language-html">
&lt;v-tabs
  :fill=&quot;example.fill&quot;
  :center=&quot;example.center&quot;
  :right=&quot;example.right&quot;
  :transition=&quot;example.transition&quot;
  :name=&quot;example.name&quot;
  @input:changed-tab=&quot;
    example.events.unshift({ ev: 'input:changed-tab', data: $event })
  &quot;
&gt;
  &lt;v-tab name=&quot;Tab&quot; class=&quot;p-4&quot;&gt;
    ...
  &lt;/v-tab&gt;
  &lt;v-tab name=&quot;Tab 2&quot; class=&quot;p-4&quot;&gt;
    ...
  &lt;/v-tab&gt;
  &lt;v-tab name=&quot;Another tab&quot; class=&quot;p-4&quot;&gt;
    ...
  &lt;/v-tab&gt;
  &lt;v-tab name=&quot;Another tab&quot; class=&quot;p-4&quot;&gt;
    &lt;template #name&gt;
      Tab with custom content
      &lt;v-badge style-badge=&quot;secondary tiny&quot;&gt;4&lt;/v-badge&gt;
    &lt;/template&gt;
    ...
  &lt;/v-tab&gt;
&lt;/v-tabs&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import ExampleTabs from "./examples/ExampleTabs.vue"

export default {
  components: {
    ExampleTabs,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "fill",
        type: ["Boolean"],
        default: "false",
        description: "Tabs fill full width of tab bar",
      },
      {
        prop: "center",
        type: ["Boolean"],
        default: "false",
        description: "Centers tabs",
      },
      {
        prop: "right",
        type: ["Boolean"],
        default: "false",
        description: "Puts tabs on the right",
      },
      {
        prop: "transition",
        type: ["Boolean"],
        default: "false",
        description:
          "Transition animation to use when swtiching tab content. Valid values are 'fade' or empty string (no transition)",
      },
      {
        prop: "name",
        type: ["String"],
        default: "tabs",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-tab-bar",
        description: "Tab bar style",
      },
      {
        prop: "style-tab",
        description: "Single tab style",
      },
    ]);

    let events = ref([
      {
        prop: "input:changed-tab",
        description: "Emitted when another tab is activated",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description: "Slot for v-tab components",
      },
    ]);

    let components = ref([
      {
        prop: "v-tab",
        description: `Tab content component <br>
        <p class="font-semibold py-2">Props</p>
        <span class="font-semibold">name</span>: label of tab displayed on tab bar
        <br>
        <span class="font-semibold">active</span>: if true tab is active
        <p class="font-semibold py-2">Slots</p>
        <span class="font-semibold">default</span>: Slot for content of tab
        <br>
        <span class="font-semibold">name</span>: Slot for customizing label on tab bar. Useful for formatting or adding icons
        `,
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
