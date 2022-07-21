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

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots" reference="slot"></table-reference-basic>
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
import ExampleInput from "./examples/ExampleInput.vue"
import exampleInputCode from "./examples/ExampleInput.vue?raw"
import { styleProps, formProps } from "./shared-props"

export default {
  components: {
    ExampleInput,
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
        description: "Rules for validation",
      },
      {
        prop: "validate",
        type: ["String"],
        default: "on-blur silent",
        description: "Validation modes. See Form Validation for possible modes",
      },
      {
        prop: "block",
        type: ["Boolean"],
        default: "false",
        description: "Input v-model",
      },
      ...formProps({ icon:true, clearable: true }),
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
    ]);

    let slots = ref([
      {
        slot: "icon",
        description: "Slot for icon",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
      exampleInputCode,
    };
  },
};
</script>

<style scoped>
</style>
