<template>
  <h3>List</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Components</h6>
    <p></p>
    <table-reference-basic :items="components"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-list></example-list>
    </div>
    <pre>
      <code v-pre class="language-html">
&lt;v-list width=&quot;500px&quot; :tag=&quot;example.tag&quot; :name=&quot;example.name&quot;&gt;
  &lt;v-list-item :active=&quot;example.active1&quot;&gt;
    &lt;div class=&quot;font-semibold&quot;&gt;
      &#123;&#123; dataJSON[0].first_name  &#125;&#125; &#123;&#123; dataJSON[0].last_name &#125;&#125; 
    &lt;/div&gt;
    &lt;div class=&quot;text-gray-400&quot;&gt;
      &#123;&#123; dataJSON[0].email &#125;&#125;
    &lt;/div&gt;
    &lt;div&gt;
      &lt;input type=&quot;checkbox&quot; v-model=&quot;example.active1&quot; /&gt;
      &lt;label for=&quot;&quot; class=&quot;ml-2&quot;&gt;toggle active&lt;/label&gt;
    &lt;/div&gt;
  &lt;/v-list-item&gt;
&lt;/v-list&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleList from "./examples/ExampleList.vue"

export default {
  components: {
    ExampleList,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "width",
        type: ["String"],
        default: "undefined",
        description: "Component width",
      },
      {
        prop: "tag",
        type: ["String"],
        default: "div",
        description: "Defines tag to use in list item child component (for example 'div', 'a' or 'button')",
      },
      {
        prop: "name",
        type: ["String"],
        default: "list",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-list",
        description: "Main list element",
      },
      {
        prop: "style-item",
        description: "List item style",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description: "Slot for v-list-item components",
      },
    ]);

    let components = ref([
      {
        prop: "v-list-item",
        description: "List item component",
      },
    ]);

    return {
      reference,
      styles,
      slots,
      components,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
