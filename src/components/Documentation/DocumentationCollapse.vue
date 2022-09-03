<template>
  <h3>Collapse</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />

    <h6>Components</h6>
    <table-reference-basic :items="components" reference="component" />
  </section>

  <section>
    <h4>Notes</h4>
    <p>
    <ul class="flex flex-col gap-y-7">
      <li>
        <header class="font-semibold text-lg mb-2">
          <span>#</span>
Collapse activation
        </header>
    You can activate collapse in two ways: by using <code class="code-text">reference</code> slot or <code class="code-text">v-model</code>. Slot is recommened as it takes minimal set up and can be done in template alone. <code class="code-text">v-model</code> can still be used to programatically toggle collapse.
      </li>
      <li>
        <header class="font-semibold text-lg mb-2">
          <span>#</span>
          Accordion
        </header>
        You can group <code class="code-text">v-collapse</code> components to create accordion. See example below.
      </li>
      </ul>
    </p>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleCollapse"></example>
    </div>
  </section>

  <section>
    <h4>Example - accordion</h4>
    <div class="example">
      <p>
        Turn collapse components to accordion by wrapping them with <code class="code-text">v-accordion</code>
        component. In accordion mode only one collapse element can be opened.
      </p>
      <example name="ExampleCollapseAccordion"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Boolean"],
        default: "undefined",
        description:
          "Setting v-model to `true` shows collapsible element, `false` value hides it",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade-collapse",
        description:
          "Sets animation effect when showing or hiding dropdown. Valid values are: 'fade-collapse' or `empty string` to disable animations. Animation speed can be set in `--collapse-transition-duration` css variable.",
      },
    ]);

    let slots = ref([
      {
        slot: "default",
        description: "Slot for content that is collapsed",
      },
      {
        slot: "reference",
        description: "Slot for content that triggers collapse. Slot props: `isOpen`, `onTrigger`",
      },
    ]);

    let components = ref([
      {
        component: "v-button-collapse",
        description: "Optional version of v-button that has indicator build in and automatically toggles attached v-model on click. It uses the same props as v-button as well as props of v-chevron. Use v-button-collapse for minimal setup or normal v-button for more customizing options.",
      },
    ]);

    return {
      reference,
      slots,
      components,
    };
  },
};
</script>

<style scoped>
</style>
