<template>
  <h3>Spinner</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-spinner></example-spinner>
    </div>
    <pre>
      <code class="language-html">
  &lt;v-spinner style-spinner=&quot;blue small&quot; class=&quot;mr-10&quot;&gt;&lt;/v-spinner&gt;
  &lt;v-spinner style-spinner=&quot;green&quot; class=&quot;mr-10&quot;&gt;&lt;/v-spinner&gt;
  &lt;v-spinner
    style-spinner=&quot;yellow large&quot;
    class=&quot;mr-4&quot;
  &gt;&lt;/v-spinner&gt;

  &lt;v-spinner thickness=&quot;0.07&quot; class=&quot;mr-4&quot;&gt;&lt;/v-spinner&gt;
  &lt;v-spinner thickness=&quot;0.2&quot; style-spinner=&quot;yellow&quot; class=&quot;mr-4&quot;&gt;&lt;/v-spinner&gt;
  &lt;v-spinner thickness=&quot;0.35&quot; style-spinner=&quot;green&quot; class=&quot;mr-4&quot;&gt;&lt;/v-spinner&gt;
  &lt;v-spinner speed=&quot;0.6&quot; style-spinner=&quot;blue&quot; class=&quot;mr-4&quot;&gt;&lt;/v-spinner&gt;
  &lt;v-spinner speed=&quot;1.0&quot; style-spinner=&quot;green&quot; class=&quot;mr-4&quot;&gt;&lt;/v-spinner&gt;
  &lt;v-spinner speed=&quot;1.5&quot; style-spinner=&quot;yellow&quot; class=&quot;mr-4&quot;&gt;&lt;/v-spinner&gt;

  &lt;v-button class=&quot;mr-2&quot;&gt;
    &lt;v-spinner style-spinner=&quot;gray small&quot;&gt;&lt;/v-spinner&gt;
    &lt;span class=&quot;ml-2&quot;&gt;Button&lt;/span&gt;
  &lt;/v-button&gt;
  &lt;v-button style-button=&quot;secondary&quot;&gt;
    &lt;v-spinner style-spinner=&quot;green small&quot;&gt;&lt;/v-spinner&gt;
    &lt;span class=&quot;ml-2&quot;&gt;Button&lt;/span&gt;
  &lt;/v-button&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleSpinner from "./examples/ExampleSpinner.vue"

export default {
  components: {
    ExampleSpinner,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "thickness",
        type: ["String"],
        default: "0.15",
        description: "Thickness of spinner in em units",
      },
      {
        prop: "speed",
        type: ["String"],
        default: "0.75",
        description: "Speed of spinner in seconds",
      },
      {
        prop: "name",
        type: ["String"],
        default: "spinner",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-spinner",
        description: "Main spinner element",
      },
    ]);

    let events = ref([
      {
        event: "-",
        description: "Update v-model",
      },
    ]);

    let slots = ref([
      {
        slot: "-",
        description: "This component does not provide any slots.",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
