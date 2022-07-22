<template>
  <h3>Checkbox</h3>
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
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-checkbox></example-checkbox>
    </div>
    <v-code :code="exampleCheckboxCode" template language="html"></v-code>
    <v-code :code="exampleCheckboxCode" script language="js"></v-code>
  </section>

  <section>
    <h4>Checkbox group</h4>
    <div class="example">
      <example-checkbox-group></example-checkbox-group>
      <v-code
        :code="exampleCheckboxGroupCode"
        template
        language="html"
      ></v-code>
      <v-code :code="exampleCheckboxGroupCode" script language="js"></v-code>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleCheckbox from "./examples/ExampleCheckbox.vue";
import ExampleCheckboxGroup from "./examples/ExampleCheckboxGroup.vue";
import exampleCheckboxCode from "./examples/ExampleCheckbox.vue?raw";
import exampleCheckboxGroupCode from "./examples/ExampleCheckboxGroup.vue?raw";
import { styleProps, formProps } from "./shared-props"

export default {
  components: {
    ExampleCheckbox,
    ExampleCheckboxGroup,
  },
  setup() {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Checkbox v-model",
      },
      {
        prop: "label",
        type: ["String"],
        default: "",
        description: "Checkbox label",
      },
      ...formProps(),
      ...styleProps("input"),
    ]);

    let styles = ref([
      {
        prop: "style-checkbox",
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
      exampleCheckboxCode,
      exampleCheckboxGroupCode,
    };
  },
};
</script>

<style scoped>
</style>
