<template>
  <h3>Popover</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

    <h6>Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />

    <h6>Components</h6>
    <table-reference-basic :items="components" reference="component" />

    <h6>Functions</h6>
    <table-reference-basic :items="functions" reference="function" />
  </section>

  <v-divider></v-divider>

  <section>
    <h4>Notes</h4>
    <ul class="flex flex-col gap-y-7 mt-6">
      <li>
        <header class="font-semibold text-lg mb-2">
          <span>#</span>
          Popover activation
        </header>
        To control popover visibility you can use <code class="code-text">reference</code> slot (recommended method) or <code class="code-text">v-trigger</code> component. To control it programatically you can add optional <code class="code-text">v-model</code> or call exposed <code class="code-text">show()</code> and <code class="code-text">hide()</code> functions.
      </li>
      <li>
        <header class="font-semibold text-lg mb-2">
          <span>#</span>
          Popover content
        </header>
        Popover allows for any type of content inside. To make it flexible it does not have own default container, you can use <code class="code-text">v-card</code> with variants or utility classes to organize content.
      </li>
      <li>
        <header class="font-semibold text-lg mb-2">
          <span>#</span>
          Teleport
        </header>
        Open popover is by default appended to the body element.
      </li>
      <li>
        <header class="font-semibold text-lg mb-2">
          <span>#</span>
          Context popovers
        </header>
        You can set up context popover with <code class="code-text">v-popover</code>. See example below.
      </li>
    </ul>
  </section>

  <v-divider></v-divider>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExamplePopover"></example>
    </div>
  </section>

  <section>
    <h4>Example - open by id</h4>
    <p>
    You can also control state of the popover by using <code class="code-text">v-trigger</code> component. The for prop of the <code class="code-text">v-trigger</code> should be the same as <code class="code-text">id</code> of the popover. The advantage of this method over reference slot is that <code class="code-text">v-triggers</code> can be put anywhere in application.
    </p>
    <div class="example">
      <example name="ExamplePopoverTrigger" :script="false"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "./components-documentation/vPopover.json"

export default {
  setup() {
    let reference = reactive(componentDocumentation)

    let components = ref([
      {
        component: "v-popover-header",
        description: "Optional header of the popover with close button. Title can be set in `default` slot or in `title` prop of v-popover",
      },
    ]);

    let functions = ref([
      {
        function: "showContextPopover($event, contextData: Object)",
        description: "Shows context popover. Context data is available in slot props of `default` slot",
      },
    ]);

    return {
      reference,
      components,
      functions,
    };
  },
};
</script>

<style scoped>
</style>
