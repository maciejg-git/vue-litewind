<template>
  <h3>Modal</h3>
  <links-github-header component="vModal" />

  <section>
    <h4 id="ModalReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="ModalEvents">Events</h6>
    <table-reference-basic :items="reference.events" reference="event" />

    <h6 id="ModalSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="ModalNotes">Notes</h4>
    <ul class="flex flex-col gap-y-7 mt-6">
      <li>
        <header class="font-semibold text-lg dark:text-text-200 mb-2">
          Modal activation
        </header>
        To control modal visibility you can use <code class="code-text">v-model</code> or <code class="code-text">v-trigger</code> component
      </li>
      <li>
        <header class="font-semibold text-lg dark:text-text-200 mb-2">
          Teleport
        </header>
        Open modal is by default appended to the body element
      </li>
    </ul>
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="ExampleModalSimple">Example - simple modal</h4>
    <div class="example">
      <example name="ExampleModalSimple"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleModal">Example</h4>
    <div class="example">
      <example name="ExampleModal"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleModalSlots">Example - modal slot</h4>
    <p>
    You can use <code class="code-text">modal</code> slot to replace all default content for complete customization.
    </p>
    <div class="example">
      <example name="ExampleModalSlots"></example>
    </div>
  </section>

  <section id="ExampleModalTrigger" class="scroll-mt-20">
    <h4 id="ExampleModalTrigger">Example - open by id</h4>
    <p>
    You can also control state of the modal by using <code class="code-text">v-trigger</code> component. The <code class="code-text">for</code> prop of the <code class="code-text">v-trigger</code> should be the same as <code class="code-text">id</code> of the modal. <code class="code-text">v-trigger</code> can be anywhere in application.
    </p>
    <div class="example">
      <example name="ExampleModalTrigger"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vModal.json"

export default {
  setup() {
    let reference = reactive(componentDocumentation)
    
    return {
      reference,
    };
  },
};
</script>

<style scoped>
</style>
