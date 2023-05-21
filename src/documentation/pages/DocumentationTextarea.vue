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

  <section>
    <h4 id="ExampleTextarea">Example - props</h4>
    <div class="example">
      <example name="ExampleTextarea"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vTextarea.json"

export default {
  setup(props) {
    let reference = reactive(componentDocumentation)
    
    return {
      reference,
    };
  },
};
</script>

<style scoped>
</style>
