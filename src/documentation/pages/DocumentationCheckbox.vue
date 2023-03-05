<template>
  <h3>Checkbox</h3>
  <links-github-header component="vCheckbox" />

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->

    <h6>Components</h6>
    <table-reference-basic :items="components" reference="component" />
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
    Checkboxes can be optionally wrapped with <code class="code-text">v-checkbox-group</code> to create group with single <code class="code-text">v-model</code>. Group also allows more validation options.
    </p>
    <div class="example">
      <example name="ExampleCheckboxGroup"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vCheckbox.json"

export default {
  setup() {
    let reference = reactive(componentDocumentation)
    
    let components = ref([
      {
        component: "v-checkbox-simple",
        description: "v-checkbox-simple is a lighter, simpler checkbox variant that can be used in lists, tables etc.",
      },
      {
        component: "v-checkbox-group",
        description: "Checkboxes can be optionally wrapped with v-checkbox-group component to create group with single v-model and additional validation rules",
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
