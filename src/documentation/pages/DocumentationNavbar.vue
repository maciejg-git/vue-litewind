<template>
  <h3>Navbar</h3>
  <links-github-header component="vNavbar" />

  <section>
    <h4 id="NavbarReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="navbarSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <section>
    <h4 id="ExampleNavbar">Example</h4>
    <div class="example relative">
      <example name="ExampleNavbar"></example>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vNavbar.json";

let reference = reactive(componentDocumentation);
</script>

<style scoped></style>
