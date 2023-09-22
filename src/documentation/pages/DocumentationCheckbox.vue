<template>
  <h3>Checkbox</h3>
  <links-github-header component="vCheckbox" />

  <section>
    <h4 id="CheckboxReference">Reference</h4>
    <table-reference :items="reference.props" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->

    <h6 id="CheckboxComponents">Components</h6>
    <table-reference-basic
      :items="components"
      reference="component"
    />
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="CheckboxNotes">Notes</h4>
    <ul class="mt-6 flex flex-col gap-y-7">
      <li>
        <header class="mb-2 text-lg font-semibold dark:text-text-200">
          Simple checkbox
        </header>
        <code class="code-text">v-checkbox-simple</code>
        is a lighter, simpler checkbox variant that can be used in lists, tables
        etc. Simple checkbox only has
        <code class="code-text">mod-checkbox</code>
        and
        <code class="code-text">base</code>
        prop. It does not allow
        <code class="code-text">v-model</code>
        but
        <code class="code-text">:checked</code>
        prop and
        <code class="code-text">@changed</code>
        event can be used instead.
      </li>
    </ul>
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="ExampleCheckbox">Example - props</h4>
    <div class="example">
      <example name="ExampleCheckbox"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleCheckboxGroup">Example - checkbox group</h4>
    <p>
      Checkboxes can be optionally wrapped with
      <code class="code-text">v-checkbox-group</code>
      to create group with single
      <code class="code-text">v-model</code>
      . Group allows more validation options.
    </p>
    <div class="example">
      <example name="ExampleCheckboxGroup"></example>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vCheckbox.json";

let reference = reactive(componentDocumentation);

let components = ref([
  {
    component: "v-checkbox-simple",
    description:
      "v-checkbox-simple is a lighter, simpler checkbox variant that can be used in lists, tables etc.",
  },
  {
    component: "v-checkbox-group",
    description:
      "Checkboxes can be optionally wrapped with v-checkbox-group component to create group with single v-model and additional validation rules",
  },
]);
</script>

<style scoped></style>
