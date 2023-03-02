<template>
  <h3>List</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

    <h6>Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />

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
import { ref, reactive } from "vue";
import componentDocumentation from "./components-documentation/vList.json"

export default {
  setup(props) {
    let reference = reactive(componentDocumentation)

    let components = ref([
      {
        component: "v-list-item",
        description: "List item component",
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
