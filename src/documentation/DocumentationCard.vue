<template>
  <h3>Card</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />
  </section>

  <section>
    <h4>Example - simple card</h4>
    <div class="example">
      <example name="ExampleCardSimple"></example>
    </div>
  </section>

  <section>
    <h4>Example - horizontal card</h4>
    <div class="example">
      <example name="ExampleCardHorizontal"></example>
    </div>
  </section>

  <section>
    <h4>Example - overlay card</h4>
    <div class="example">
      <example name="ExampleCardOverlay"></example>
    </div>
  </section>

  <section>
    <h4>Example - flat card</h4>
    <div class="example">
      <example name="ExampleCardRounded"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { sharedProps, styleProps } from "./shared-props"

export default {
  setup() {
    let reference = ref([
      {
        prop: "width",
        type: ["String"],
        default: "undefined",
        description: "Width of the card",
      },
      ...styleProps(),
      ...sharedProps(),
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
