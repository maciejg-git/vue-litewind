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
    <table-reference-basic :items="slots"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-card></example-card>
    </div>
    <v-code :code="exampleCardCode" template language="html"></v-code>
    <v-code :code="exampleCardCode" script language="html"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleCard from "./examples/ExampleCard.vue"
import exampleCardCode from "./examples/ExampleCard.vue?raw"

export default {
  components: {
    ExampleCard,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "width",
        type: ["String"],
        default: "undefined",
        description: "Width of the card",
      },
      {
        prop: "name",
        type: ["String"],
        default: "card",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-card",
        description: "Main card element",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description: "Slot for card content",
      },
    ]);

    return {
      reference,
      styles,
      slots,
      exampleCardCode,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
