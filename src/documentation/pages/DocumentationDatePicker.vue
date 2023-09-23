<template>
  <h3>Date Picker</h3>
  <links-github-header component="vDatePicker" />

  <section>
    <h4 id="DatepickerReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="DatepickerEvents">Events</h6>
    <table-reference-basic :items="reference.events" reference="event" />

    <h6 id="DatepickerSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <v-divider class="my-10"></v-divider>

  <date-picker-md></date-picker-md>
</template>

<script setup>
import { reactive } from "vue";
import componentDocumentation from "../components-documentation/vDatePicker.json"
import datePickerMd from "./datepicker.md"

let reference = reactive(componentDocumentation)
</script>

<style scoped>
</style>
