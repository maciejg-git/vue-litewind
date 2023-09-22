<template>
  <h3>Trigger</h3>
  <links-github-header component="vTrigger" />
  
  <section>
    <h4 id="TriggerNotes">Notes</h4>
    <p class="mt-6">
      This component does not create any elements and is used to trigger some actions on other components, for example opening dropdowns, modals or sidepanels by their
      <code class="code-text">id</code>
      . Elements that trigger those actions should be placed in <code class="code-text">v-trigger</code> component default slot. See examples of
      <a href="/documentation/dropdown#ExampleDropdownTrigger" class="link">dropdown</a>
      , <a href="/documentation/modal#ExampleModalTrigger" class="link">modal</a>
      or <a href="/documentation/sidepanel#ExampleSidepanelTrigger" class="link">sidepanel</a>.
    </p>
  </section>

  <section>
    <h4 id="TriggerReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="TriggerSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vTrigger.json"

let reference = reactive(componentDocumentation)
</script>
