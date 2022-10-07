<template>
  <h3>Checkbox</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->
  </section>

  <section>
    <h4>Notes</h4>
    <ul class="flex flex-col gap-y-7 mt-6">
      <li>
        <header class="font-semibold text-lg mb-2">
          <span>#</span>
        Simple checkbox
        </header>
        <code class="code-text">v-checkbox-simple</code> is a lighter, simpler checkbox variant that can be used in lists, tables etc. Simple checkbox only has <code class="code-text">style-checkbox</code> and <code class="code-text">base</code> prop. It does not allow <code class="code-text">v-model</code> but <code class="code-text">:checked</code> prop and <code class="code-text">@changed</code> event can be used instead.
      </li>
    </ul>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleCheckbox"></example>
    </div>
  </section>

  <section>
    <h4>Checkbox group</h4>
    <p>
    Checkboxes can be optionally wrapped with <code class="code-text">v-checkbox-group</code> component to create group with single <code class="code-text">v-model</code>.
    </p>
    <div class="example">
      <example name="ExampleCheckboxGroup"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { sharedProps, styleProps, formProps } from "./shared-props"

export default {
  setup() {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Checkbox v-model",
      },
      {
        prop: "label",
        type: ["String"],
        default: "empty string",
        description: "Checkbox label",
      },
      ...formProps(),
      ...styleProps(),
      ...sharedProps(),
    ]);

    let styles = ref([
      {
        prop: "style-checkbox",
        description: "Main input element",
      },
      {
        prop: "style-label",
        description: "Input label element",
      },
    ]);

    let events = ref([
    ]);

    return {
      reference,
      styles,
      events,
    };
  },
};
</script>

<style scoped>
</style>
