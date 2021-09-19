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

    <h6>Events</h6>
    <p></p>
    <table-reference-basic :items="events"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
    <example-checkbox></example-checkbox>
    </div>
  </section>

  <section>
    <h4>Checkbox group</h4>
    <div class="example">
      <example-checkbox-group></example-checkbox-group>
    </div>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import ExampleCheckbox from "./examples/ExampleCheckbox.vue"
import ExampleCheckboxGroup from "./examples/ExampleCheckboxGroup.vue"
import hljs from "highlight.js";

export default {
  components: {
    ExampleCheckbox,
    ExampleCheckboxGroup,
  },
  setup(props) {
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
          "State of input validity. Supported values are 'valid' (or true), 'invalid' (or false) or 'empty string' (or null) for default state",
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
      {
        prop: "update:modelValue",
        description: "Update v-model",
      },
    ]);

    onMounted(() => {
      hljs.highlightAll();
    });

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
