<template>
  <h3>Select</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleSelect"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { styleProps, formProps } from "./shared-props"

export default {
  setup() {
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
          "Array of options to display in select element. Each option is an `object` with `value` and `label` properties. This prop is optional, you can use default slot to add options instead",
      },
      ...formProps({ icon: true }),
      ...styleProps(),
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
        slot: "options-prepend",
        description: "Slot for additional options (added before options from options prop)",
      },
      {
        slot: "default",
        description: "Slot for additional options (added after options from options prop)",
      },
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
    };
  },
};
</script>

<style scoped>
</style>
