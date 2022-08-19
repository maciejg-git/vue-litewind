<template>
  <h3>Range</h3>

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
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleRange"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { styleProps, formProps } from "./shared-props"

export default {
  setup() {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Number", "String"],
        default: "undefined",
        description: "Range v-model",
      },
      ...formProps(),
      ...styleProps(),
    ]);

    let styles = ref([
      {
        prop: "style-range",
        description: "Main input element",
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
