<template>
  <h3>Badge</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleBadge" :script="false"></example>
    </div>
  </section>

  <section>
    <h4>Example - animated badge</h4>
    <div class="example">
      <example name="ExampleBadgeAnimated"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { styleProps } from "./shared-props"

export default {
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
      ...styleProps(),
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
    };
  },
};
</script>

<style scoped>
</style>
