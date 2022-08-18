<template>
  <h3>Card</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots" reference="slot"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleCard"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { styleProps } from "./shared-props"

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "width",
        type: ["String"],
        default: "undefined",
        description: "Width of the card",
      },
      ...styleProps(),
    ]);

    let styles = ref([
      {
        prop: "style-card",
        description: "Main card element",
      },
    ]);

    let slots = ref([
      {
        slot: "default",
        description: "Slot for card content",
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

<style scoped>
</style>
