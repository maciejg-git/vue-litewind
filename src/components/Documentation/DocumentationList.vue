<template>
  <h3>List</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots" reference="slot"></table-reference-basic>

    <h6>Components</h6>
    <p></p>
    <table-reference-basic :items="components" reference="component"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-list></example-list>
    </div>
    <v-code :code="exampleListCode" template language="html"></v-code>
    <v-code :code="exampleListCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleList from "./examples/ExampleList.vue"
import exampleListCode from "./examples/ExampleList.vue?raw"
import { styleProps } from "./shared-props"

export default {
  components: {
    ExampleList,
  },
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
        default: "div",
        description: "Defines tag to use in list item child component (for example 'div', 'a' or 'button')",
      },
      ...styleProps("list"),
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
      exampleListCode,
    };
  },
};
</script>

<style scoped>
</style>
