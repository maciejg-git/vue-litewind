<template>
  <h3>Dropdown Menu Item</h3>
  <links-github-header component="vDropdown" />

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

    <h6>Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vDropdownMenuItem.json"

export default {
  setup(props) {
    let reference = reactive(componentDocumentation)

    return {
      reference,
    };
  },
};
</script>

<style scoped></style>
