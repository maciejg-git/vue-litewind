<template>
  <h3>Popover</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />

    <h6>Functions</h6>
    <table-reference-basic :items="functions" reference="function" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExamplePopover"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { popperProps, styleProps } from "./shared-props"

export default {
  setup() {
    let reference = ref([
      {
        prop: "trigger",
        type: ["String"],
        default: "click",
        description:
          "How to trigger dropdown. Valid triggers are <code class='code-text'>'click'</code>, <code class='code-text'>'focus'</code> and <code class='code-text'>'hover'</code>",
      },
      {
        prop: "no-header",
        type: ["Boolean"],
        default: "false",
        description: "Disabled popover header",
      },
      {
        prop: "title",
        type: ["String"],
        default: "undefined",
        description: "Title displayed in popover header",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade-m",
        description: "Sets animation effect when showing or hiding popover. Valid values are: 'fade-f', 'fade-m' and 'fade-s'. Empty string disables animations.",
      },
      {
        prop: "click-outside-close",
        type: ["Boolean"],
        default: "false",
        description: "If true clicking outside of popover closes it",
      },
      ...popperProps,
      ...styleProps(),
    ]);

    let styles = ref([
      {
        prop: "style-popover",
        description: "Main popover element",
      },
      {
        prop: "style-content",
        description: "Content of popover",
      },
    ]);

    let slots = ref([
      {
        slot: "activator",
        description: "Slot for element that activates popover",
      },
      {
        slot: "default",
        description: "Slot for popover content",
      },
    ]);

    let functions = ref([
      {
        function: "showContextPopover($event, contextData: Object)",
        description: "Shows context popover. Context data is available in slot props of default slot",
      },
    ]);

    return {
      reference,
      styles,
      slots,
      functions,
    };
  },
};
</script>

<style scoped>
</style>
