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

  <checkbox-md></checkbox-md>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vCheckbox.json";
import checkboxMd from "./checkbox.md"

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
