<template>
  <h3>Textarea</h3>
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
      <example-textarea></example-textarea>
    </div>
    <pre>
      <code class="language-html">
&lt;v-textarea
  v-model=&quot;example.model&quot;
  :state=&quot;example.state&quot;
  cols=&quot;40&quot;
  rows=&quot;10&quot;
  placeholder=&quot;Textarea example&quot;
&gt;
&lt;/v-textarea&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleTextarea from "./examples/ExampleTextarea.vue"

export default {
  components: {
    ExampleTextarea,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Textarea v-model",
      },
      {
        prop: "state",
        type: ["String"],
        default: "empty string",
        description: "State of textarea validity. Supported values are 'valid', 'invalid' or 'empty string' for default state",
      },
      {
        prop: "name",
        type: ["String"],
        default: "textarea",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-textarea",
        description: "Main textarea element",
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
