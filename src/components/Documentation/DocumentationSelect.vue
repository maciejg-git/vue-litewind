<template>
  <h3>Select</h3>
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

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-select></example-select>
    </div>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import ExampleSelect from "./examples/ExampleSelect.vue"

export default {
  components: {
    ExampleSelect,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Select v-model",
      },
      {
        prop: "options",
        type: ["Array"],
        default: "undefined",
        description:
          "Array of options to display in select element. Each option is <code class='code-word'>Object</code> with <code class='code-word'>value</code> and <code class='code-word'>label</code> properties. This prop is optional, you can use default slot to add options instead",
      },
      {
        prop: "state",
        type: ["String"],
        default: "empty string",
        description:
          "State of select validity. Supported values are 'valid', 'invalid' or 'empty string' for default state",
      },
      {
        prop: "name",
        type: ["String"],
        default: "select",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-select",
        description: "Main select element",
      },
    ]);

    let events = ref([
      {
        prop: "update:modelValue",
        description: "Update v-model",
      },
    ]);

    let slots = ref([
      {
        prop: "options-prepend",
        description: "Slot for additional options (added before options from options prop)",
      },
      {
        prop: "default",
        description: "Slot for additional options (added after options from options prop)",
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
