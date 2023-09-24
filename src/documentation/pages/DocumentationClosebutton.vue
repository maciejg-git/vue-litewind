<template>
  <h3>Close button</h3>
  <links-github-header component="vCloseButton" />

  <section>
    <h4 id="ClosebuttonReference">Reference</h4>
    <table-reference :items="reference.props" />
  </section>

  <close-button-md></close-button-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vCloseButton.json";
import closeButtonMd from "./close-button.md";

let reference = reactive(componentDocumentation);
</script>
