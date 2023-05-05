<template>
  <h3>Popover</h3>
  <links-github-header component="vPopover" />

  <section>
    <h4 id="PopoverReference">Reference</h4>
    <h6 id="PopoverSlots" class="mt-10">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vPopoverHeader.json"

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
