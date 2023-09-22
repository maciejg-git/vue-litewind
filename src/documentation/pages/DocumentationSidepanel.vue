<template>
  <h3>Sidepanel</h3>
  <links-github-header component="vSidepanel" />

  <section>
    <h4 id="SidepanelReference">Reference</h4>
    <table-reference :items="reference.props" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->

    <h6 id="SidepanelSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="DropdownNotes">Notes</h4>
    <ul class="mt-6 flex flex-col gap-y-7">
      <li>
        <header class="mb-2 text-lg font-semibold dark:text-text-200">
          Sidepanel activation
        </header>
        To control sidepanel visibility you can use
        <code class="code-text">v-model</code>
        or
        <code class="code-text">v-trigger</code>
        component.
      </li>
    </ul>
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="ExampleSidepanel">Example - props</h4>
    <div class="example">
      <example name="ExampleSidepanel"></example>
    </div>
  </section>

  <section id="ExampleSidepanelTrigger">
    <h4 id="ExampleSidepanelTrigger">Example - open by id</h4>
    <p>
      You can also control state of the sidepanel menu by using
      <code class="code-text">v-trigger</code>
      component. The
      <code class="code-text">for</code>
      prop of the
      <code class="code-text">v-trigger</code>
      should be the same as
      <code class="code-text">id</code>
      of the sidepanel. The advantage of this method is that
      <code class="code-text">v-triggers</code>
      can be put anywhere in application. Read more about v-trigger here.
    </p>
    <div class="example">
      <example name="ExampleSidepanelTrigger"></example>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vSidepanel.json";

let reference = reactive(componentDocumentation);
</script>

<style scoped></style>
