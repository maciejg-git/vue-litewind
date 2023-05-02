<template>
  <h3>Breadcrumb</h3>
  <links-github-header component="vBreadcrumb" />

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />
  </section>

  <section>
    <h4>Prop: path</h4>
    <span class="font-bold">Type</span>: <code class="code-word">Array</code>
    <p>Path is an Array of Objects where each object should have <code class='code-text'>label</code> property and <code class='code-text'>to</code> or <code class='code-text'>href</code> property that is used as <code class='code-text'>to</code> prop for router-link. Optional icon property is a name of icon that prepends element of path.</p>
    <v-code :code="examplePath" language="js"></v-code>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleBreadcrumb"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vBreadcrumb.json"

export default {
  setup() {
    let reference = reactive(componentDocumentation)

    let examplePath = 
`let path = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Documentation",
    to: "/",
  },
  {
    label: "Breadcrumb",
  },
],`

    return {
      reference,
      examplePath,
    };
  },
};
</script>

<style scoped>
</style>
