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
      <example name="ExampleChip" :script="false"></example>
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
        prop: "disabled",
        type: ["Boolean"],
        default: "false",
        description: "Displays button in `disabled` state",
      },
      {
        prop: "close-button",
        type: ["Object"],
        default: "{ base: 'round-close-button', styleCloseButton: 'small' }",
        description: "Attributes of input v-close-button component",
      },
      ...styleProps(),
      ...sharedProps(),
    ]);

    let styles = ref([
      {
        prop: "style-chip",
        description: "Main chip element",
      },
    ]);

    let slots = ref([
      {
        slot: "default",
        description: "Slot for chip content",
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
