<template>
  <h3>Form text helper</h3>

  <section>
    <h4>Notes</h4>
    <p>
      <code class="code-text">v-form-text</code> is used by form components to display validation messages. See Form Validation for examples.
    </p>
  </section>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleFormText from "./examples/ExampleFormText.vue";
import exampleFormTextCode from "./examples/ExampleFormText.vue?raw";
import { styleProps } from "./shared-props"

export default {
  components: {
    ExampleFormText,
  },
  setup() {
    let reference = ref([
      {
        prop: "state",
        type: ["String"],
        default: "empty string",
        description:
          "Current state of input",
      },
      {
        prop: "inline",
        type: ["Boolean"],
        default: "false",
        description: "Inline-flex version of the form text. Default is flex.",
      },
      {
        prop: "messages",
        type: ["Object"],
        default: "{}",
        description:
          "Object with messages to display depending on current state.",
      },
      {
        prop: "single-line-message",
        type: ["Object"],
        default: "{}",
        description:
          "Limits the number of displayed errors to one at time",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "'fade-scale'",
        description:
          "Transition when showing message. Valid values are <code class='code-text'>'fade-scale'</code> or <code class='code-text'>empty string</code>",
      },
      ...styleProps(),
    ]);

    let styles = ref([
      {
        prop: "style-form-text",
        description: "Text element",
      },
    ]);

    let slots = ref([
      {
        slot: "message",
        description:
          "Slot for message",
      },
    ]);

    return {
      reference,
      styles,
      slots,
      exampleFormTextCode,
    };
  },
};
</script>

<style scoped>
</style>
