<template>
  <h3>Tabs</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

    <h6>Events</h6>
    <table-reference-basic :items="reference.events" reference="event" />

    <h6>Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />

    <h6>Components</h6>
    <table-reference-basic :items="components" reference="component">
    </table-reference-basic>
  </section>

  <section>
    <h4>Example - simple tabs</h4>
    <div class="example">
      <example name="ExampleTabsSimple" :script="false"></example>
    </div>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleTabs"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "./components-documentation/vTabs.json"

export default {
  setup(props) {
    let reference = reactive(componentDocumentation)

    let components = ref([
      {
        component: "v-tab",
        description: `
        `,
      },
    ]);

    return {
      reference,
      components,
    };
  },
};
</script>

<style scoped></style>
