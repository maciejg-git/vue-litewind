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
    <table-reference-basic :items="events" reference="event"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots" reference="slot"></table-reference-basic>

    <h6>Components</h6>
    <p></p>
    <table-reference-basic :items="components" reference="component">
      <template #description-v-tab="{ value }">
        Tab content component
        <br />
        <p class="font-semibold py-1">Props</p>
        <ul class="ml-4">
          <li>
            <code class="code-text">name</code>
            <div class="ml-4">label of tab displayed on tab bar</div>
          </li>
        </ul>
        <p class="font-semibold py-1">Slots</p>
        <ul class="ml-4">
          <li>
            <code class="code-text">default</code>
            <div class="ml-4">Slot for content of tab</div>
          </li>
          <li>
            <code class="code-text">name</code>
            <div class="ml-4">
              Slot for customizing label on tab bar. Useful for formatting or
              adding icons
            </div>
          </li>
        </ul>
      </template>
    </table-reference-basic>
  </section>

  <section>
    <h4>Example - simple tabs</h4>
    <div class="example">
      <example-tabs-simple></example-tabs-simple>
    </div>
    <v-code :code="exampleTabsSimpleCode" template language="html"></v-code>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-tabs></example-tabs>
    </div>
    <v-code :code="exampleTabsCode" template language="html"></v-code>
    <v-code :code="exampleTabsCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleTabs from "./examples/ExampleTabs.vue";
import ExampleTabsSimple from "./examples/ExampleTabsSimple.vue";
import exampleTabsCode from "./examples/ExampleTabs.vue?raw";
import exampleTabsSimpleCode from "./examples/ExampleTabsSimple.vue?raw";
import { styleProps } from "./shared-props";

export default {
  components: {
    ExampleTabs,
    ExampleTabsSimple,
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
      ...styleProps("tabs"),
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
        event: "input:changed-tab",
        description: "Emitted when another tab is activated",
      },
    ]);

    let slots = ref([
      {
        slot: "default",
        description: "Slot for v-tab components",
      },
    ]);

    let components = ref([
      {
        component: "v-tab",
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
      exampleTabsCode,
      exampleTabsSimpleCode,
    };
  },
};
</script>

<style scoped></style>
