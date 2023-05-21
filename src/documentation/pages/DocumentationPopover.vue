<template>
  <h3>Popover</h3>
  <links-github-header component="vPopover" />

  <section>
    <h4 id="PopoverReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="PopoverSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />

    <h6 id="PopoverComponents">Components</h6>
    <p>
      <a
        href="/documentation/popover-header"
        class="link"
      >
        v-popover-header
      </a>
    </p>
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="PopoverNotes">Notes</h4>
    <ul class="flex flex-col gap-y-7 mt-6">
      <li>
        <header class="font-semibold text-lg dark:text-text-200 mb-2">
          Popover activation
        </header>
        To control popover visibility you can use <code class="code-text">reference</code> slot (recommended method) or <code class="code-text">v-trigger</code> component. To control it programatically you can add optional <code class="code-text">v-model</code> or call exposed <code class="code-text">show()</code> and <code class="code-text">hide()</code> functions.
      </li>
      <li>
        <header class="font-semibold text-lg dark:text-text-200 mb-2">
          Popover content
        </header>
        Popover allows for any type of content inside. To make it flexible it does not have own default container, you can use <code class="code-text">v-card</code> with variants or utility classes to organize content.
      </li>
      <li>
        <header class="font-semibold text-lg dark:text-text-200 mb-2">
          Teleport
        </header>
        Open popover is by default appended to the body element.
      </li>
    </ul>
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="ExamplePopover">Example - props</h4>
    <div class="example">
      <example name="ExamplePopover"></example>
    </div>
  </section>

  <section>
    <h4 id="ExamplePopoverTrigger">Example - open by id</h4>
    <p>
    You can also control state of the popover by using <code class="code-text">v-trigger</code> component. The for prop of the <code class="code-text">v-trigger</code> should be the same as <code class="code-text">id</code> of the popover. The advantage of this method over reference slot is that <code class="code-text">v-triggers</code> can be put anywhere in application.
    </p>
    <div class="example">
      <example name="ExamplePopoverTrigger"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vPopover.json"

export default {
  setup() {
    let reference = reactive(componentDocumentation)

    let components = ref([
      {
        component: "v-popover-header",
        description: "Optional header of the popover with close button. Title can be set in `default` slot or in `title` prop of v-popover",
      },
    ]);

    return {
      reference,
      components,
    };
  },
};
</script>

<style scoped>
</style>
