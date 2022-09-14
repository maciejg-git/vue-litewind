<template>
  <h3>Sidepanel</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <!-- <h6>Events</h6> -->
    <!-- <p></p> -->
    <!-- <table-reference-basic :items="events"></table-reference-basic> -->

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleSidepanel"></example>
    </div>
  </section>

  <section>
    <h4>Example - open by id</h4>
    <div class="example">
      <example name="ExampleSidepanelTrigger" :script="false"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { sharedProps, styleProps } from "./shared-props"

export default {
  setup() {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Boolean"],
        default: "false",
        description:
          "Controls the state of sidepanel. If `true`, sidepanel is open",
      },
      {
        prop: "show-close-button",
        type: ["Boolean"],
        default: "true",
        description: "If `true` shows a close button in top right corner",
      },
      {
        prop: "sidebar-left",
        type: ["Boolean"],
        default: "false",
        description: "If `true` displays sidepanel on the left",
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
        description: "When `true` the header slot content and close button is not rendered",
      },
      {
        prop: "close-button",
        type: ["String"],
        default: "{}",
        description: "Attributes of v-close-button component. See documentation for valid values",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade-slide-m",
        description:
          "Sets animation effect when showing or hiding sidepanel. Valid values are: 'fade-slide' or `empty string` to disable animations. Animation speed can be set in `--sidepanel-transition-duration` css variable.",
      },
      ...styleProps(),
      ...sharedProps(),
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
