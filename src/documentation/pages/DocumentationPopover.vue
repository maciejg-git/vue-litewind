<template>
  <h3>Popover</h3>
  <links-github-header component="vPopover" />

  <section>
    <h4 id="PopoverReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="PopoverSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />

    <h6 id="PopoverComponents">Components</h6>
    <p>
      <a
        href="/documentation/popover-header"
        class="link"
      >
        v-popover-header
      </a>
    </p>
  </section>

  <popover-md></popover-md>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vPopover.json";
import popoverMd from "./popover.md"

let reference = reactive(componentDocumentation);

let components = ref([
  {
    component: "v-popover-header",
    description:
      "Optional header of the popover with close button. Title can be set in `default` slot or in `title` prop of v-popover",
  },
]);
</script>
