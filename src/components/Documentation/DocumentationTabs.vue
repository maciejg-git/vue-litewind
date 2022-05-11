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
    <v-code :code="exampleTabsCode" template language="html"></v-code>
    <v-code :code="exampleTabsCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import ExampleTabs from "./examples/ExampleTabs.vue"
import exampleTabsCode from "./examples/ExampleTabs.vue?raw"
import { styleProps } from "./shared-props"

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
      exampleTabsCode,
    };
  },
};
</script>

<style scoped>
</style>
