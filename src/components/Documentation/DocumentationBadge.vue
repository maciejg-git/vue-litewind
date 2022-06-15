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
    <table-reference-basic :items="slots" reference="slot"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-badge></example-badge>
    </div>
    <v-code :code="exampleBadgeCode" template language="html"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleBadge from "./examples/ExampleBadge.vue"
import exampleBadgeCode from "./examples/ExampleBadge.vue?raw"
import { styleProps } from "./shared-props"

export default {
  components: {
    ExampleBadge,
  },
  setup() {
    let reference = ref([
      {
        prop: "position",
        type: ["String"],
        default: "empty string",
        description:
          "Position of badge. Valid values are 'top-right', 'top-left', 'bottom-right', 'bottom-left'. If position is set to any of those values badge is positioned as absolute in the corner of parent element (parent element must be positioned as relative). If you need finer control over position skip position prop altogether and use utility/classes/style to set absolute position within parent.",
      },
      {
        prop: "update-animation",
        type: ["String"],
        default: "empty string",
        description:
          "Animation to play when updating content of badge. Valid values are: 'scale-up', 'bounce', 'to-danger' and 'to-success'",
      },
      {
        prop: "update-key",
        type: ["String"],
        default: "undefined",
        description:
          "Update this prop to unique key every time contents of default slot changes (required to rerender component and play animation)",
      },
      ...styleProps("badge"),
    ]);

    let styles = ref([
      {
        prop: "style-badge",
        description: "Main badge element",
      },
    ]);

    let slots = ref([
      {
        slot: "default",
        description: "Slot for badge content",
      },
    ]);

    return {
      reference,
      styles,
      slots,
      exampleBadgeCode,
    };
  },
};
</script>

<style scoped>
</style>
