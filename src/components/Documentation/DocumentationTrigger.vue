<template>
  <h3>Trigger</h3>
  <section>
    <h4>Notes</h4>
    <p>
      This component is used to trigger some actions on other components (for
      example opening dropdown or modal) by their
      <code class="code-text">id</code>
      . See examples here.
    </p>
  </section>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "for",
        type: ["String"],
        default: "undefined",
        description: "Id of the component for that trigger",
      },
    ]);

    let slots = ref([
      {
        slot: "default",
        description:
          "Slot for element that triggers events. Slot props: `reference`, `onTrigger` and `isOpen`",
      },
    ]);

    return {
      reference,
      slots,
    };
  },
};
</script>
