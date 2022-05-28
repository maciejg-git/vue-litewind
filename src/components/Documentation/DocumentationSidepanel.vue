<template>
  <h3>Sidepanel</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-sidepanel></example-sidepanel>
    </div>
    <v-code :code="exampleSidepanelCode" template language="html"></v-code>
    <v-code :code="exampleSidepanelCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleSidepanel from "./examples/ExampleSidepanel.vue"
import exampleSidepanelCode from "./examples/ExampleSidepanel.vue?raw"
import { styleProps } from "./shared-props"

export default {
  components: {
    ExampleSidepanel,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Boolean"],
        default: "false",
        description:
          "Controls the state of sidepanel. If true, sidepanel is open",
      },
      {
        prop: "close-button",
        type: ["Boolean"],
        default: "true",
        description: "If true shows a close button in top right corner",
      },
      {
        prop: "sidebar-left",
        type: ["Boolean"],
        default: "false",
        description: "If true displays sidepanel on the left",
      },
      {
        prop: "width",
        type: ["String"],
        default: "320px",
        description: "Width of sidepanel",
      },
      {
        prop: "no-header",
        type: ["Boolean"],
        default: "false",
        description: "When true the header slot content and close button is not rendered",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade-slide-m",
        description:
          "Sets animation effect when showing or hiding sidepanel. Valid values are: 'fade-slide-f', 'fade-slide-m' and 'fade-slide-s'. Empty string disables animations.",
      },
      ...styleProps("sidepanel"),
    ]);

    let styles = ref([
      {
        prop: "style-sidepanel",
        description: "Main sidepanel element",
      },
    ]);

    let events = ref([
    ]);

    let slots = ref([
      {
        prop: "header",
        description: "Slot for header content",
      },
      {
        prop: "default",
        description: "Slot for sidepanel content",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
      exampleSidepanelCode,
    };
  },
};
</script>

<style scoped>
</style>
