<template>
  <h3>Checkbox</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-checkbox></example-checkbox>
    </div>
    <v-code :code="exampleCheckboxCode" template language="html"></v-code>
    <v-code :code="exampleCheckboxCode" script language="js"></v-code>
  </section>

  <section>
    <h4>Checkbox group</h4>
    <div class="example">
      <example-checkbox-group></example-checkbox-group>
      <v-code
        :code="exampleCheckboxGroupCode"
        template
        language="html"
      ></v-code>
      <v-code :code="exampleCheckboxGroupCode" script language="js"></v-code>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import ExampleCheckbox from "./examples/ExampleCheckbox.vue";
import ExampleCheckboxGroup from "./examples/ExampleCheckboxGroup.vue";
import exampleCheckboxCode from "./examples/ExampleCheckbox.vue?raw";
import exampleCheckboxGroupCode from "./examples/ExampleCheckboxGroup.vue?raw";
import hljs from "highlight.js";

export default {
  components: {
    ExampleCheckbox,
    ExampleCheckboxGroup,
  },
  setup() {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Checkbox v-model",
      },
      {
        prop: "state",
        type: ["String"],
        default: "empty string",
        description:
          "State of input the validity. Supported values are 'valid' (or true), 'invalid' (or false) or 'empty string' (or null) for default state",
      },
      {
        prop: "name",
        type: ["String"],
        default: "checkbox",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-checkbox",
        description: "Main input element",
      },
    ]);

    let events = ref([
    ]);

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      styles,
      events,
      exampleCheckboxCode,
      exampleCheckboxGroupCode,
    };
  },
};
</script>

<style scoped>
</style>
