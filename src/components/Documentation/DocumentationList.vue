<template>
  <h3>List</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />

    <h6>Components</h6>
    <table-reference-basic :items="components" reference="component" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleList"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { sharedProps, styleProps } from "./shared-props"

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "width",
        type: ["String"],
        default: "undefined",
        description: "Component width",
      },
      {
        prop: "tag",
        type: ["String"],
        default: "'div'",
        description: "Defines tag to use in list item child component (for example 'div', 'a' or 'button')",
      },
      ...styleProps(),
      ...sharedProps(),
    ]);

    let styles = ref([
      {
        prop: "style-list",
        description: "Main list element",
      },
      {
        prop: "style-item",
        description: "List item style",
      },
    ]);

    let slots = ref([
      {
        slot: "default",
        description: "Slot for v-list-item components",
      },
    ]);

    let components = ref([
      {
        component: "v-list-item",
        description: "List item component",
      },
    ]);

    return {
      reference,
      styles,
      slots,
      components,
    };
  },
};
</script>

<style scoped>
</style>
