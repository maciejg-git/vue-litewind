<template>
  <h3>Radio</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleRadio"></example>
    </div>
  </section>

  <section>
    <h4>Radio group</h4>
    <div class="example">
      <example name="ExampleRadioGroup"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { sharedProps, styleProps, formProps } from "./shared-props"

export default {
  setup() {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Radio v-model",
      },
      {
        prop: "rules",
        type: ["Object"],
        default: "{}",
        description: "Rules for validation. See Form Validation for examples of rules",
      },
      {
        prop: "validate-on",
        type: ["String"],
        default: "'blur'",
        description:
          "Valid values are 'blur' or 'immediate'. See Form Validation for explanation and examples",
      },
      {
        prop: "label",
        type: ["String"],
        default: "empty string",
        description: "Radio label",
      },
      ...formProps(),
      ...styleProps(),
      ...sharedProps(),
    ]);

    let styles = ref([
      {
        prop: "style-radio",
        description: "Main input element",
      },
      {
        prop: "style-label",
        description: "Input label element",
      },
    ]);

    let events = ref([
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
