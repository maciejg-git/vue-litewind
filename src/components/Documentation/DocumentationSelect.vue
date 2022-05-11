<template>
  <h3>Select</h3>
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
    <table-reference-basic :items="slots"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-select></example-select>
    </div>
    <v-code :code="exampleSelectCode" template language="html"></v-code>
    <v-code :code="exampleSelectCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import ExampleSelect from "./examples/ExampleSelect.vue"
import exampleSelectCode from "./examples/ExampleSelect.vue?raw"
import { styleProps, formProps } from "./shared-props"

export default {
  components: {
    ExampleSelect,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Select v-model",
      },
      {
        prop: "options",
        type: ["Array"],
        default: "undefined",
        description:
          "Array of options to display in select element. Each option is <code>Object</code> with <code>value</code> and <code>label</code> properties. This prop is optional, you can use default slot to add options instead",
      },
      ...formProps({ icon: true }),
      ...styleProps("select"),
    ]);

    let styles = ref([
      {
        prop: "style-select",
        description: "Main select element",
      },
      {
        prop: "style-icon",
        description: "Icon element if icon prop is true",
      },
    ]);

    let events = ref([
    ]);

    let slots = ref([
      {
        prop: "options-prepend",
        description: "Slot for additional options (added before options from options prop)",
      },
      {
        prop: "default",
        description: "Slot for additional options (added after options from options prop)",
      },
      {
        prop: "icon",
        description: "Slot for icon",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
      exampleSelectCode,
    };
  },
};
</script>

<style scoped>
</style>
