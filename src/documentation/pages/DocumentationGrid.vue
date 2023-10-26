<template>
  <h3>Grid</h3>
  <links-github-header component="Grid" />

  <section>
    <h4 id="GridComponents">Grid components</h4>
    <table-reference-basic
      :items="components"
      reference="component"
    ></table-reference-basic>
  </section>

  <grid-md></grid-md>
</template>

<script setup>
import gridMd from "./grid.md"

let components = [
  {
    component: "v-container",
    description:
      "Responsive container that sets `max-width` for current breakpoint. It is centered by default.",
  },
  {
    component: "v-fluid-container",
    description: "Variant of container that fills available width.",
  },
  {
    component: "v-row",
    description:
      "Wrapper for columns. v-rows should be placed directly inside v-container or v-cols and may only contain v-cols.",
  },
  {
    component: "v-col",
    description:
      "Single column for the content. It can only be placed inside v-rows.",
  },
  {
    component: "v-col-break",
    description: "Allows breaking of the v-cols and v-auto-cols to a new line.",
  },
];
</script>

<style>
.column-content {
  @apply rounded
    border
    border-dark-400
    bg-secondary-200
    p-2
    dark:border-dark-400
    dark:bg-dark-700;
}
.nested-column-content {
  @apply rounded
    border-2
    border-red-400
    bg-secondary-200
    p-2
    dark:border-red-400
    dark:bg-dark-700;
}
</style>
