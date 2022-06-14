<template>
  <h3>Popover</h3>
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
    <table-reference-basic :items="slots" reference="slot"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-popover></example-popover>
    </div>
    <v-code :code="examplePopoverCode" template language="html"></v-code>
    <v-code :code="examplePopoverCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExamplePopover from "./examples/ExamplePopover.vue"
import examplePopoverCode from "./examples/ExamplePopover.vue?raw"
import { popperProps, styleProps } from "./shared-props"

export default {
  components: {
    ExamplePopover,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "trigger",
        type: ["String"],
        default: "click",
        description:
          "Type of trigger that show or hides popover. Valid triggers are 'click', 'hover' and 'focus'",
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
      ...styleProps("popover"),
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

    return {
      reference,
      styles,
      slots,
      examplePopoverCode,
    };
  },
};
</script>

<style scoped>
</style>
