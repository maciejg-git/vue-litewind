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
    <table-reference-basic :items="slots" reference="slot"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleSidepanel"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { styleProps } from "./shared-props"

export default {
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
        default: "'320px'",
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
      ...styleProps(),
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
        slot: "header",
        description: "Slot for header content",
      },
      {
        slot: "default",
        description: "Slot for sidepanel content",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
    };
  },
};
</script>

<style scoped>
</style>
