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
import { styleProps } from "./shared-props";

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
        <p class="font-semibold py-2">Props:</p>
        <code class="code-text">name</code>: label of tab displayed on tab bar
        <p class="font-semibold py-2">Slots:</p>
        <code class="code-text">default</code>: slot for tab content
        <br>
        <code class="code-text">name</code>: slot for tab label on the tab bar. Useful for formatting, adding icons and buttons etc
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
