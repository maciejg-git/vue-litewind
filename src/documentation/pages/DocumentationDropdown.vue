<template>
  <h3>Dropdown</h3>
  <links-github-header component="vDropdown" />

  <section>
    <h4 id="DropdownReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="DropdownEvents">Events</h6>
    <table-reference-basic
      :items="reference.events"
      reference="event"
    />

    <h6 id="DropdownSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />

    <h6 id="DropdownComponents">Components</h6>
    <p>
      <a
        href="/documentation/dropdown-menu-item"
        class="link"
      >
        v-dropdown-menu-item
      </a>
    </p>

    <h6 id="DropdownFunctions">Functions</h6>
    <table-reference-basic
      :items="reference.functions"
      reference="function"
    />
  </section>

  <dropdown-md></dropdown-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vDropdown.json";
import dropdownMd from "./dropdown.md";

let reference = reactive(componentDocumentation);
</script>
