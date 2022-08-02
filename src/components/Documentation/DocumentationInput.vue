<template>
  <h3>Input</h3>
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
    <table-reference-basic :items="events" reference="event"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic
      :items="slots"
      reference="slot"
    ></table-reference-basic>
  </section>

  <section>
    <h4>Example - simple input</h4>
    <div class="example">
      <example-input-simple></example-input-simple>
    </div>
    <v-code :code="exampleInputSimpleCode" template language="html"></v-code>
    <v-code :code="exampleInputSimpleCode" script language="js"></v-code>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-input></example-input>
    </div>
    <v-code :code="exampleInputCode" template language="html"></v-code>
    <v-code :code="exampleInputCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleInput from "./examples/ExampleInput.vue";
import ExampleInputSimple from "./examples/ExampleInputSimple.vue";
import exampleInputCode from "./examples/ExampleInput.vue?raw";
import exampleInputSimpleCode from "./examples/ExampleInputSimple.vue?raw";
import { styleProps, formProps } from "./shared-props";

export default {
  components: {
    ExampleInput,
    ExampleInputSimple,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Input v-model",
      },
      {
        prop: "rules",
        type: ["Object"],
        default: "{}",
        description: "Rules for validation. See Form Validation for example",
      },
      {
        prop: "validate-on",
        type: ["String"],
        default: "blur",
        description:
          "Valid values are <code class='code-text'>blur</code> or <code class='code-text'>immediate</code>. See Form Validation for explanation and examples",
      },
      {
        prop: "validate-mode",
        type: ["String"],
        default: "silent",
        description:
          "Valid values are <code class='code-text'>silent</code> or <code class='code-text'>eager</code>. See Form Validation for explanation and examples",
      },
      {
        prop: "use-loading",
        type: ["Boolean"],
        default: "false",
        description: "Set to true or false to enable or disable spinner in the input",
      },
      {
        prop: "is-loading",
        type: ["Boolean"],
        default: "false",
        description: "If true displays spinner in the input. Spinner should be first enabled in <code class='code-text'>use-loading</code> prop",
      },
      {
        prop: "single-line-message",
        type: ["Boolean"],
        default: "false",
        description: "Limits the number of displayed errors to one at time. Order of messages is the same as order of rules in <code class='code-text'>rules</code> prop",
      },
      {
        prop: "spinner",
        type: ["Boolean"],
        default: "false",
        description: "Props of input spinner",
      },
      {
        prop: "block",
        type: ["Boolean"],
        default: "false",
        description: "Sets input display to block",
      },
      ...formProps({ icon: true, clearable: true }),
      ...styleProps("input"),
    ]);

    let styles = ref([
      {
        prop: "style-input",
        description: "Main input element",
      },
      {
        prop: "style-icon",
        description: "Icon element if icon prop is true",
      },
      {
        prop: "style-clear-button",
        description: "Clear input button if clearable prop is true",
      },
    ]);

    let events = ref([
      {
        event: "update:status",
        description: "Emitted after validating input. Event data contains new status",
      },
      {
        event: "input:clear",
        description: "Emitted after clicking clear button",
      },
    ]);

    let slots = ref([
      {
        slot: "icon",
        description: "Slot for icon",
      },
      {
        slot: "prepend",
        description: "Slot for content prepending input",
      },
      {
        slot: "append",
        description: "Slot for content appending input",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
      exampleInputCode,
      exampleInputSimpleCode,
    };
  },
};
</script>

<style scoped></style>
