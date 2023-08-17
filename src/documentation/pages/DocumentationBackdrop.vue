<template>
  <h3>Backdrop</h3>
  <links-github-header component="vBackdrop" />

  <section>
    <h4 id="ButtonReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="ButtonSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="FormtextNotes">Notes</h4>
    <p class="mt-6">
      <code class="code-text">v-backdrop</code> is used internally to display dimmed background for components like <code class="code-text">v-modal</code> or <code class="code-text">v-sidepanel</code>. Alternatively it can be used on top of other elements to add overlay effect. For more examples see <a href="/documentation/modal" class="link">modal</a> documentation.
    </p>
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="">Example - show overlay on hover</h4>
    <div class="example">
      <example name="ExampleCardBackdrop"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vBackdrop.json"

export default {
  setup() {
    let reference = reactive(componentDocumentation)

    return {
      reference,
    };
  },
};
</script>

<style scoped></style>
