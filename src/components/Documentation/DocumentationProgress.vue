<template>
  <h3>Progress</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleProgress"></example>
    </div>
  </section>

  <section>
    <h4>Example - indeterminate</h4>
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
    <div class="example">
      <example name="ExampleProgressIndeterminate"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { styleProps } from "./shared-props"

export default {
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
      ...styleProps(),
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
        slot: "default",
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
</style>
