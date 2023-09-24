<template>
  <h3>Textarea</h3>
  <links-github-header component="vTextarea" />

  <section>
    <h4 id="TextareaReference">Reference</h4>
    <table-reference :items="reference.props" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->

    <h6 id="TextareaSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <textarea-md></textarea-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vTextarea.json"
import textareaMd from "./textarea.md"

let reference = reactive(componentDocumentation)
</script>
