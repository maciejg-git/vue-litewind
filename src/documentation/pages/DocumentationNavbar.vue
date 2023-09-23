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

  <navbar-md></navbar-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vNavbar.json";
import navbarMd from "./navbar.md"

let reference = reactive(componentDocumentation);
</script>
