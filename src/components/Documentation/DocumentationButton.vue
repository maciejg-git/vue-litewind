<template>
  <h3>Button</h3>
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
      <example-button></example-button>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleButton from "./examples/ExampleButton.vue"

export default {
  components: {
    ExampleButton,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "tag",
        type: ["String"],
        default: "button",
        description: "Tag of button element. Valid values are: 'button' or 'a'",
      },
      {
        prop: "disabled",
        type: ["Boolean"],
        default: "false",
        description: "Displays button in disabled state",
      },
      {
        prop: "block",
        type: ["Boolean"],
        default: "false",
        description: "Displays button as full width block",
      },
      {
        prop: "name",
        type: ["String"],
        default: "button",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-button",
        description: "Main button element",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
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

<style scoped>
@import "./Documentation.css";
</style>
