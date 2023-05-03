<template>
  <h3>List</h3>
  <links-github-header component="vList" />

  <section>
    <h4 id="ListReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="ListSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />

    <h6 id="ListComponents">Components</h6>
    <p>
      <a
        href="/documentation/list-item"
        class="link"
      >
        v-list-item
      </a>
    </p>
  </section>

  <section>
    <h4 id="ExampleList">Example</h4>
    <div class="example">
      <example name="ExampleList"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vList.json"

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
