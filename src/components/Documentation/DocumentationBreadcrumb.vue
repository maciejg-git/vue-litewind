<template>
  <h3>Breadcrumb</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>
  </section>

  <section>
    <h5>Prop: path</h5>
    <span class="font-bold">Type</span>: <code class="code-word">Array</code>
    <p>Path is an Array of Objects where each object should have <code class='code-text'>label</code> property and <code class='code-text'>to</code> or <code class='code-text'>href</code> property that is used as <code class='code-text'>to</code> prop for router-link. Optional icon property is a name of icon that prepends element of path.</p>
    <v-code :code="examplePath" language="js"></v-code>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-breadcrumb />
    </div>
    <v-code :code="exampleBreadcrumbCode" template language="html"></v-code>
    <v-code :code="exampleBreadcrumbCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import exampleBreadcrumbCode from "./examples/ExampleBreadcrumb.vue?raw"
import { styleProps } from "./shared-props"

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "path",
        type: ["Array"],
        default: "undefined",
        description: "Path of links to render",
      },
      {
        prop: "separator",
        type: ["String"],
        default: "'/'",
        description: "Character or string that seperates links",
      },
      ...styleProps(),
    ]);

    let styles = ref([
      {
        prop: "style-breadcrumb",
        description: "Breadcrumb link",
      },
      {
        prop: "style-separator",
        description: "Breadcrumb separator",
      },
      {
        prop: "style-active",
        description: "Active link in path",
      },
    ]);

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
      styles,
      examplePath,
      exampleBreadcrumbCode,
    };
  },
};
</script>

<style scoped>
</style>
