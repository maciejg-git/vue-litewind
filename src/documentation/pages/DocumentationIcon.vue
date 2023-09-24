<template>
  <h3>Icon</h3>
  <links-github-header component="vIcon" />

  <section>
    <h4 id="IconReference">Reference</h4>
    <table-reference :items="reference.props" />
  </section>

  <icon-md></icon-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vIcon.json";
import iconMd from "./icon.md";

let reference = reactive(componentDocumentation);
</script>
