<template>
  <h3>Badge</h3>
  <links-github-header component="vBadge" />

  <section>
    <h4 id="BadgeReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="BadgeSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <section>
    <h4 id="ExampleBadge">Example</h4>
    <div class="example">
      <example name="ExampleBadge"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleBadgeSpecial">Example - positioned badge</h4>
    <div class="example">
      <example name="ExampleBadgeSpecial"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleBadgeAnimated">Example - animated badge</h4>
    <p>
    To animate badge one time on value update use <code class="code-text">update-key</code> prop. For persistent animation you can use Tailwind animate classes.
    </p>
    <div class="example">
      <example name="ExampleBadgeAnimated"></example>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vBadge.json"

let reference = reactive(componentDocumentation)
</script>

<style scoped>
</style>
