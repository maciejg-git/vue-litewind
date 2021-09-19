<template>
  <h3>Collapse</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-collapse></example-collapse>
    </div>
    <pre>
      <code class="language-html">
&lt;v-card class=&quot;p-1&quot;&gt;
  &lt;v-button
    style-button=&quot;default&quot;
    block
    @click=&quot;example.isVisible = !example.isVisible&quot;
  &gt;
    Toggle collapse
  &lt;/v-button&gt;
  &lt;v-collapse v-model=&quot;example.isVisible&quot;&gt;
    &lt;div class=&quot;p-4&quot;&gt;
      ...
    &lt;/div&gt;
  &lt;/v-collapse&gt;
&lt;/v-card&gt;

&lt;v-card class=&quot;p-1 mt-1&quot;&gt;
  &lt;v-button
    block
    style-button=&quot;default&quot;
    @click=&quot;example.isVisible2 = !example.isVisible2&quot;
  &gt;
    Toggle collapse 2
  &lt;/v-button&gt;
  &lt;v-collapse v-model=&quot;example.isVisible2&quot;&gt;
    &lt;div class=&quot;p-4&quot;&gt;
      ...
    &lt;/div&gt;
  &lt;/v-collapse&gt;
&lt;/v-card&gt;

&lt;v-card class=&quot;p-1 mt-1&quot;&gt;
  &lt;v-button
    block
    style-button=&quot;default&quot;
    @click=&quot;example.isVisible3 = !example.isVisible3&quot;
  &gt;
    Toggle collapse 3
  &lt;/v-button&gt;
  &lt;v-collapse v-model=&quot;example.isVisible3&quot;&gt;
    &lt;div class=&quot;p-4&quot;&gt;
      ...
    &lt;/div&gt;
  &lt;/v-collapse&gt;
&lt;/v-card&gt;
      </code>
    </pre>
  </section>

  <section>
    <h4>Example accordion</h4>
    <div class="example">
      <p>
        Turn collapse components to accordion by wrapping them with v-accordion
        component.
      </p>
      <example-collapse-accordion></example-collapse-accordion>
    </div>
    <pre>
      <code class="language-html">
&lt;v-card class=&quot;p-1&quot;&gt;
  &lt;v-button
    style-button=&quot;default&quot;
    block
    @click=&quot;example.isVisible = !example.isVisible&quot;
  &gt;
    Toggle collapse
  &lt;/v-button&gt;
  &lt;v-collapse v-model=&quot;example.isVisible&quot;&gt;
    &lt;div class=&quot;p-4&quot;&gt;
      ...
    &lt;/div&gt;
  &lt;/v-collapse&gt;
&lt;/v-card&gt;

&lt;v-card class=&quot;p-1 mt-1&quot;&gt;
  &lt;v-button
    block
    style-button=&quot;default&quot;
    @click=&quot;example.isVisible2 = !example.isVisible2&quot;
  &gt;
    Toggle collapse 2
  &lt;/v-button&gt;
  &lt;v-collapse v-model=&quot;example.isVisible2&quot;&gt;
    &lt;div class=&quot;p-4&quot;&gt;
      ...
    &lt;/div&gt;
  &lt;/v-collapse&gt;
&lt;/v-card&gt;

&lt;v-card class=&quot;p-1 mt-1&quot;&gt;
  &lt;v-button
    block
    style-button=&quot;default&quot;
    @click=&quot;example.isVisible3 = !example.isVisible3&quot;
  &gt;
    Toggle collapse 3
  &lt;/v-button&gt;
  &lt;v-collapse v-model=&quot;example.isVisible3&quot;&gt;
    &lt;div class=&quot;p-4&quot;&gt;
      ...
    &lt;/div&gt;
  &lt;/v-collapse&gt;
&lt;/v-card&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import ExampleCollapse from "./examples/ExampleCollapse.vue"
import ExampleCollapseAccordion from "./examples/ExampleCollapseAccordion.vue"

export default {
  components: {
    ExampleCollapse,
    ExampleCollapseAccordion,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Boolean"],
        default: "undefined",
        description:
          "Setting v-model to <code>true</code> shows collapsible element, <code>false </code>value hides it",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description: "Slot for content that is collapsed",
      },
    ]);

    return {
      reference,
      slots,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
