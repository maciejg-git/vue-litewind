<template>
  <h3>Range</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Events</h6>
    <p></p>
    <table-reference-basic :items="events"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-range></example-range>
    </div>
    <pre>
      <code class="language-html">
&lt;v-range
  v-model=&quot;example.model&quot;
  :state=&quot;example.state&quot;
  min=&quot;0&quot;
  max=&quot;100&quot;
  class=&quot;w-full&quot;
&gt;&lt;/v-range&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleRange from "./examples/ExampleRange.vue"

export default {
  components: {
    ExampleRange,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Number", "String"],
        default: "undefined",
        description: "Range v-model",
      },
      {
        prop: "state",
        type: ["String"],
        default: "empty string",
        description:
          "State of input validity. Supported values are 'valid', 'invalid' or 'empty string' for default state",
      },
      {
        prop: "name",
        type: ["String"],
        default: "range",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-range",
        description: "Main input element",
      },
    ]);

    let events = ref([
      {
        prop: "update:modelValue",
        description: "Update v-model",
      },
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
@import "./Documentation.css";
</style>
