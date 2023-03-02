<template>
  <h3>Trigger</h3>
  <section>
    <h4>Notes</h4>
    <p class="mt-6">
      This component is used to trigger some actions on other components (for
      example opening dropdown or modal) by their
      <code class="code-text">id</code>
      . See example
      <a href="/documentation/dropdown#ExampleDropdownTrigger" class="link">dropdown</a>
      , <a href="/documentation/modal#ExampleModalTrigger" class="link">modal</a>
      or <a href="/documentation/sidepanel#ExampleSidepanelTrigger" class="link">sidepanel</a>.
    </p>
  </section>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

    <h6>Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "./components-documentation/vTrigger.json"

export default {
  setup(props) {
    let reference = reactive(componentDocumentation)

    return {
      reference,
    };
  },
};
</script>
