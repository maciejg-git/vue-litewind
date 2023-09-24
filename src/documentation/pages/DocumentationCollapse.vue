<template>
  <h3>Collapse</h3>
  <links-github-header component="vCollapse" />

  <section>
    <h4 id="CollapseReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="CollapseSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />

    <h6 id="CollapseComponents">Components</h6>
    <table-reference-basic
      :items="components"
      reference="component"
    />
  </section>

  <collapse-md></collapse-md>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vCollapse.json";
import collapseMd from "./collapse.md";

let reference = reactive(componentDocumentation);

let components = ref([
  {
    component: "v-button-chevron",
    description:
      "Optional version of v-button that has indicator build in. It uses the same props as v-button. Use v-button-chevron for minimal setup or normal v-button for more customizing options.",
  },
]);
</script>
