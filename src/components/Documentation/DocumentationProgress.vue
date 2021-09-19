<template>
  <h3>Progress</h3>
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
    <table-reference-basic :items="slots"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-progress></example-progress>
    </div>
    <pre>
      <code v-pre class="language-html">
&lt;v-progress
  :value=&quot;+example.value&quot;
  :max=&quot;+example.max&quot;
  :label=&quot;example.label&quot;
  :precision=&quot;+example.precision&quot;
  :transition=&quot;example.transition&quot;
&gt;&lt;/v-progress&gt;

&lt;v-progress
  :value=&quot;+example.value&quot;
  :max=&quot;+example.max&quot;
  :label=&quot;example.label&quot;
  :precision=&quot;+example.precision&quot;
  :transition=&quot;example.transition&quot;
  class=&quot;mt-4&quot;
&gt;
  &lt;template #default=&quot;{ value, max }&quot;&gt;{{ value }} / {{ max }}&lt;/template&gt;
&lt;/v-progress&gt;

&lt;v-progress
  :value=&quot;+example.value&quot;
  :max=&quot;+example.max&quot;
  :label=&quot;example.label&quot;
  :precision=&quot;+example.precision&quot;
  :transition=&quot;example.transition&quot;
  style-progress=&quot;tiny&quot;
  style-progress-bar=&quot;gradient&quot;
  class=&quot;mt-4&quot;
&gt;&lt;/v-progress&gt;
      </code>
    </pre>
  </section>

  <section>
    <h4>Example indeterminate</h4>
    <div class="example">
      <example-progress-indeterminate></example-progress-indeterminate>
    </div>
    <pre>
      <code class="language-html">
&lt;v-progress
  style-progress=&quot;tiny&quot;
  style-progress-bar=&quot;gradient&quot;
  indeterminate
  :indeterminate-width=&quot;50&quot;
  :indeterminate-timing=&quot;example.timing&quot;
  :indeterminate-speed=&quot;+example.speed&quot;
  class=&quot;mt-4&quot;
&gt;&lt;/v-progress&gt;

&lt;v-card style-card=&quot;shadow&quot; width=&quot;400px&quot;&gt;
  &lt;div class=&quot;flex justify-center p-4&quot;&gt;Checking for updates...&lt;/div&gt;
  &lt;v-progress
    style-progress=&quot;tiny&quot;
    style-progress-bar=&quot;gradient&quot;
    indeterminate
    :indeterminate-width=&quot;50&quot;
    :indeterminate-timing=&quot;example.timing&quot;
    :indeterminate-speed=&quot;+example.speed&quot;
    class=&quot;m-2&quot;
  &gt;&lt;/v-progress&gt;
&lt;/v-card&gt;

&lt;v-card style-card=&quot;shadow&quot; width=&quot;400px&quot; class=&quot;mt-6&quot;&gt;
  &lt;div class=&quot;flex justify-center p-4&quot;&gt;
    &lt;span v-if=&quot;example.indeterminate&quot;&gt;
      Checking for updates...
    &lt;/span&gt;
    &lt;span v-if=&quot;!example.indeterminate&quot;&gt;
      Updating...
    &lt;/span&gt;
  &lt;/div&gt;
  &lt;v-progress
    style-progress=&quot;tiny&quot;
    style-progress-bar=&quot;gradient&quot;
    :value=&quot;example.indeterminateValue&quot;
    :label=&quot;false&quot;
    :indeterminate=&quot;example.indeterminate&quot;
    :indeterminate-width=&quot;50&quot;
    :indeterminate-timing=&quot;example.timing&quot;
    :indeterminate-speed=&quot;+example.speed&quot;
    class=&quot;m-2&quot;
  &gt;&lt;/v-progress&gt;
&lt;/v-card&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import ExampleProgress from "./examples/ExampleProgress.vue"
import ExampleProgressIndeterminate from "./examples/ExampleProgressIndeterminate.vue"

export default {
  components: {
    ExampleProgress,
    ExampleProgressIndeterminate,
  },
  setup() {
    let reference = ref([
      {
        prop: "value",
        type: ["Number"],
        default: "undefined",
        description: "Current progress",
      },
      {
        prop: "max",
        type: ["Number"],
        default: "undefined",
        description: "Maximum value of progress",
      },
      {
        prop: "label",
        type: ["Boolean"],
        default: "false",
        description:
          "Display value on progress bar if true. Label can be customized via label slot",
      },
      {
        prop: "precision",
        type: ["Number"],
        default: "2",
        description:
          "Number of digits after dot in progress value, minimum = 0, maximum = 100",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "true",
        description: "Add smooth animation when value change",
      },
      {
        prop: "indeterminate",
        type: ["Boolean"],
        default: "false",
        description:
          "Renders indeterminate progress bar. <span class='font-semibold'>Note</span>: value, max, label, precision and transition props are ignored if indeterminate is true. You can switch between indeterminate or determinate by flicking this prop on and off",
      },
      {
        prop: "indeterminate-width",
        type: ["Number"],
        default: "50",
        description: "Width of indeterminate bar in %",
      },
      {
        prop: "indeterminate-timing",
        type: ["String"],
        default: "linear",
        description:
          "Value of animation-timing-function property. Valid values are: 'linear', 'ease', 'ease-in', 'ease-out' or 'ease-in-out'",
      },
      {
        prop: "indeterminate-speed",
        type: ["Number"],
        default: "7",
        description: "Speed of indeterminate bar animation (1 - 20)",
      },
      {
        prop: "name",
        type: ["String"],
        default: "progress",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-progress",
        description: "Main progress element",
      },
      {
        prop: "style-progress-bar",
        description: "Progress bar element",
      },
      {
        prop: "style-label",
        description: "Label on progress bar",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description: "Slot for custom label",
      },
    ]);

    return {
      reference,
      styles,
      slots,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
