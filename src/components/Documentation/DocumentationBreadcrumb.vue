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
    <h5>Path</h5>
    <span class="font-bold">Type</span>: <code class="code-word">Array</code>
    <p>Path is an Array of Objects where each object should have <code>label</code> property and <code>to</code> property that is used as <code>to</code> prop for router-link.</p>
    <pre>
      <code>
let path = [
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
],
    </code>
  </pre>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-breadcrumb></example-breadcrumb>
    </div>
    <pre>
      <code class="language-html">
&lt;v-breadcrumb :path=&quot;example.path&quot;&gt;&lt;/v-breadcrumb&gt;
      </code>
    </pre>
    <pre>
      <code class="language-js">
let example = reactive({
  path: [
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
  ],
});
      </code>
    </pre>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleBreadcrumb from "./examples/ExampleBreadcrumb.vue"

export default {
  components: {
    ExampleBreadcrumb,
  },
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
        default: "/",
        description: "Character or string that seperates links",
      },
      {
        prop: "name",
        type: ["String"],
        default: "breadcrumb",
        description: "Name of the component",
      },
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

    return {
      reference,
      styles,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
