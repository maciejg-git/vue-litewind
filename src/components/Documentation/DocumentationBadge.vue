<template>
  <h3>Badge</h3>
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
      <example-badge></example-badge>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import ExampleBadge from "./examples/ExampleBadge.vue"

export default {
  components: {
    ExampleBadge,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "position",
        type: ["String"],
        default: "empty string",
        description:
          "Position of badge. Valid values are 'top-right', 'top-left', 'bottom-right', 'bottom-left'. If position is set to any of those values badge is positioned as absolute in the corner of parent element (parent element must be positioned as relative)",
      },
      {
        prop: "name",
        type: ["String"],
        default: "badge",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-badge",
        description: "Main badge element",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description: "Slot for badge content",
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
