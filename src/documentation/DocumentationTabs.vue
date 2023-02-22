<template>
  <h3>Tabs</h3>

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
    <table-reference-basic :items="components" reference="component">
    </table-reference-basic>
  </section>

  <section>
    <h4>Example - simple tabs</h4>
    <div class="example">
      <example name="ExampleTabsSimple" :script="false"></example>
    </div>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleTabs"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { sharedProps, styleProps } from "./shared-props";

export default {
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
          "Sets animation effect when changing tabs. Valid values are 'fade', 'fade-top-slide', 'fade-side-slide' or `empty string` to disabled animations. Animation speed can be set in `--tabs-transition-duration` css variable.",
      },
      ...styleProps(),
      ...sharedProps(),
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
        slot: "tab-bar-append",
        description: "Slot for additional content in the tab bar",
      },
      {
        slot: "default",
        description: "Slot for v-tab components",
      },
    ]);

    let components = ref([
      {
        component: "v-tab",
        description: `
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

<style scoped></style>
