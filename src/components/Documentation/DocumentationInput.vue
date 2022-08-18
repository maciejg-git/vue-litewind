<template>
  <h3>Input</h3>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles" />

    <h6>Events</h6>
    <p></p>
    <table-reference-basic :items="events" reference="event" />

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic
      :items="slots"
      reference="slot"
    />
  </section>

  <section>
    <h4>Example - simple input</h4>
    <div class="example">
      <example name="ExampleInputSimple"></example>
    </div>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleInput"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { styleProps, formProps } from "./shared-props";

export default {
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
        default: "'blur'",
        description:
          "Valid values are <code class='code-text'>blur</code> or <code class='code-text'>immediate</code>. See Form Validation for explanation and examples",
      },
      {
        prop: "validate-mode",
        type: ["String"],
        default: "'silent'",
        description:
          "Valid values are <code class='code-text'>silent</code> or <code class='code-text'>eager</code>. See Form Validation for explanation and examples",
      },
      {
        prop: "label",
        type: ["String"],
        default: "empty string",
        description: "Label on top of the input. This label is for simple forms as position cannot be changed",
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
        prop: "no-messages",
        type: ["Boolean"],
        default: "false",
        description: "If true validation messages are not displayed",
      },
      {
        prop: "spinner",
        type: ["Object"],
        default: "{}",
        description: "Attributes of input <code class='code-text'>v-spinner</code> component (loader)",
      },
      {
        prop: "close-button",
        type: ["Object"],
        default: "{}",
        description: "Attributes of input <code class='code-text'>v-close-button</code> component (clear button)",
      },
      {
        prop: "chevron",
        type: ["Object"],
        default: "{}",
        description: "Attributes of input <code class='code-text'>v-chevron</code> component (indicator)",
      },
      {
        prop: "form-text",
        type: ["Object"],
        default: "{ class: 'absolute' }",
        description: "Attributes of <code class='code-text'>v-form-text</code> component (validation messages)",
      },
      {
        prop: "inline",
        type: ["Boolean"],
        default: "false",
        description: "Sets input display to inline",
      },
      ...formProps({ icon: true, clearable: true }),
      {
        prop: "custom-clearable",
        type: ["Boolean"],
        default: "false",
        description: "Adds 'X' button that only emits <code class='code-word'>click:clear-button</code> event. It does not modify model value",
      },
      ...styleProps(),
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
        prop: "style-label",
        description: "Label element if label prop is set",
      },
    ]);

    let events = ref([
      {
        event: "update:status",
        description: "Emitted after validating input. Event data contains new status",
      },
      {
        event: "update:state",
        description: "Emitted after updating validation status. Event data contains new state",
      },
      {
        event: "update:messages",
        description: "Emitted after validating input. Event data contains new messages",
      },
      {
        event: "click:icon",
        description: "Emitted after clicking input icon",
      },
      {
        event: "click:indicator",
        description: "Emitted after clicking input indicator",
      },
      {
        event: "click:clear-button",
        description: "Emitted after clicking clear button",
      },
      {
        event: "input:blur",
        description: "This event is the same as blur but it does not fire if input is focused out by clicking any element (icon, clear button etc) inside <code class='code-text'>v-input</code> component. Regular blur can be used if needed",
      },
    ]);

    let slots = ref([
      {
        slot: "icon",
        description: "Slot for icon",
      },
      {
        slot: "label",
        description: "Slot for label. <p class='mt-4'>Slot props: <code class='code-text'>label</code> (from <code class='code-text'>label</code> prop)</p>",
      },
      {
        slot: "prepend",
        description: "Slot for content prepending input",
      },
      {
        slot: "append",
        description: "Slot for content appending input",
      },
      {
        slot: "message",
        description: "This slot can be used to customize validation messages. <p class='mt-4'>Slot props: <code class='code-text'>message</code>, <code class='code-text'>key</code></p>",
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

<style scoped></style>
