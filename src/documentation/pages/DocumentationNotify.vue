<template>
  <h3>Notify</h3>
  <links-github-header component="vInput" />

  <section>
    <h4 id="InputReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="InputEvents">Events</h6>
    <table-reference-basic :items="reference.events" reference="event" />

    <h6 id="InputSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <section>
    <h4 id="ExampleNotify">Example - notify</h4>
    <div class="example">
      <example name="ExampleNotify"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vNotify.json"

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

