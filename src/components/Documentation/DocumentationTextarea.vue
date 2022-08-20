<template>
  <h3>Textarea</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->

    <h6>Slots</h6>
    <table-reference-basic
      :items="slots"
      reference="slot"
    />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleTextarea"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { styleProps, formProps } from "./shared-props"

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Textarea v-model",
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
          "Valid values are 'blur' or 'immediate'. See Form Validation for explanation and examples",
      },
      {
        prop: "validate-mode",
        type: ["String"],
        default: "'silent'",
        description:
          "Valid values are 'silent' or 'eager'. See Form Validation for explanation and examples",
      },
      {
        prop: "label",
        type: ["String"],
        default: "empty string",
        description: "Label on top of the textarea. This label is for simple forms as position cannot be changed",
      },
      {
        prop: "inline",
        type: ["Boolean"],
        default: "false",
        description: "Sets textarea display to inline",
      },
      ...formProps(),
      ...styleProps(),
    ]);

    let styles = ref([
      {
        prop: "style-textarea",
        description: "Main textarea element",
      },
      {
        prop: "style-label",
        description: "Label element if `label` prop is set",
      },
    ]);

    let events = ref([
    ]);

    let slots = ref([
      {
        slot: "label",
        description: "Slot for label. Slot props: `label` (from label prop)",
      },
      {
        slot: "message",
        description: "This slot can be used to customize validation messages. Slot props: `message`, `key`",
      },
    ])

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
</style>
