<template>
  <h3>Breadcrumb</h3>
  <links-github-header component="vBreadcrumb" />

  <section>
    <h4 id="BreadcrumbReference">Reference</h4>
    <table-reference :items="reference.props" />
  </section>

  <section>
    <h4 id="BreadcrumbPath">Path</h4>
    <span class="font-bold">Type</span>: <code class="code-word">Array</code>
    <p>Path is an <code class="code-text">Array</code> of <code class="code-text">Objects</code> where each object should have <code class='code-text'>label</code> property and <code class='code-text'>to</code> or <code class='code-text'>href</code> property that is used as <code class='code-text'>to</code> prop for router-link. Optional <code class="code-text">icon</code> property is a name of the icon that prepends element of the path.</p>
    <v-code :code="examplePath" language="js"></v-code>
  </section>

  <section>
    <h4 id="ExampleBreadcrumb">Example</h4>
    <div class="example">
      <example name="ExampleBreadcrumb" auto-show-code></example>
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
