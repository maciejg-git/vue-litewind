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
    <v-code :code="exampleProgressCode" template language="html"></v-code>
    <v-code :code="exampleProgressCode" script language="js"></v-code>
  </section>

  <section>
    <h4>Example - indeterminate</h4>
    <div class="example">
      <example-progress-indeterminate></example-progress-indeterminate>
    </div>
    <p>Width, speed, timing function and direction of indeterminate progress bar can be customized with css variables:
    <ul>
      <li>
        <code class="code-text">
          --progress-bar-timing
        </code>
      </li>
      <li>
        <code class="code-text">
          --progress-bar-speed
        </code>
      </li>
      <li>
        <code class="code-text">
          --progress-bar-width
        </code>
      </li>
      <li>
        <code class="code-text">
          --progress-bar-direction
        </code>
      </li>
    </ul>
    </p>
    <v-code :code="exampleProgressIndeterminateCode" template language="html"></v-code>
    <v-code :code="exampleProgressIndeterminateCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleProgress from "./examples/ExampleProgress.vue"
import ExampleProgressIndeterminate from "./examples/ExampleProgressIndeterminate.vue"
import exampleProgressCode from "./examples/ExampleProgress.vue?raw"
import exampleProgressIndeterminateCode from "./examples/ExampleProgressIndeterminate.vue?raw"
import { styleProps } from "./shared-props"

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
      ...styleProps("progress"),
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
      exampleProgressCode,
      exampleProgressIndeterminateCode,
    };
  },
};
</script>

<style scoped>
</style>
