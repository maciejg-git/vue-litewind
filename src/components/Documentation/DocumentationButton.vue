<template>
  <h3>Button</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleButtonSimple" :script="false"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonSize" :script="false"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonVariant" :script="false"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonStyle" :script="false"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonIcon" :script="false"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonBlock" :script="false"></example>
    </div>
    <div class="example">
      <example name="ExampleButtonDisabled" :script="false"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { sharedProps, styleProps } from "./shared-props";

export default {
  setup() {
    let reference = ref([
      {
        prop: "tag",
        type: ["String"],
        default: "'button'",
        description: "Tag of button element. Valid values are: 'button' or 'a'",
      },
      {
        prop: "disabled",
        type: ["Boolean"],
        default: "false",
        description: "Displays button in `disabled` state",
      },
      {
        prop: "block",
        type: ["Boolean"],
        default: "false",
        description: "Displays button as full width block",
      },
      ...styleProps(),
      ...sharedProps(),
    ]);

    let styles = ref([
      {
        prop: "style-button",
        description: "Main button element",
      },
    ]);

    let slots = ref([
      {
        slot: "default",
        description: "Slot for button content",
      },
    ]);

    return {
      reference,
      styles,
      slots,
    };
  },
};
</script>

<style scoped></style>
