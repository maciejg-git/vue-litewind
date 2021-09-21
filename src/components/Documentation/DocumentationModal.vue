<template>
  <h3>Modal</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Events</h6>
    <p></p>
    <table-reference-basic :items="events"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example md:flex">
      <example-modal></example-modal>
    </div>
    <v-code :code="exampleModalCode" template language="html"></v-code>
    <v-code :code="exampleModalCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleModal from "./examples/ExampleModal.vue"
import exampleModalCode from "./examples/ExampleModal.vue?raw"

export default {
  components: {
    ExampleModal,
  },
  setup() {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Boolean"],
        default: "false",
        description: "Set v-model to true to show modal or false to hide it",
      },
      {
        prop: "title",
        type: ["String"],
        default: "false",
        description: "Title displayed in modal header",
      },
      {
        prop: "no-primary-button",
        type: ["Boolean"],
        default: "false",
        description: "Disables primary (OK) button",
      },
      {
        prop: "no-secondary-button",
        type: ["Boolean"],
        default: "false",
        description: "Disables secondary (Cancel) button",
      },
      {
        prop: "primary-button-style",
        type: ["String"],
        default: "primary",
        description: "Style of primary button",
      },
      {
        prop: "secondary-button-style",
        type: ["String"],
        default: "secondary",
        description: "Style of secondary button",
      },
      {
        prop: "primary-button-label",
        type: ["String"],
        default: "OK",
        description: "Label of primary button",
      },
      {
        prop: "secondary-button-label",
        type: ["String"],
        default: "Cancel",
        description: "Label of secondary button",
      },
      {
        prop: "primary-button-close",
        type: ["Boolean"],
        default: "false",
        description:
          "If true clicking primary button emits <code>input:secondaryButtonClick</code> event and closes modal. If false modal is not closed after emitting event",
      },
      {
        prop: "secondary-button-close",
        type: ["Boolean"],
        default: "false",
        description:
          "If true clicking primary button emits <code>input:primaryButtonClick</code> event and closes modal. If false modal is not closed after emitting event",
      },
      {
        prop: "no-close-button",
        type: ["Boolean"],
        default: "false",
        description: "Disables 'X' button in modal header",
      },
      {
        prop: "static-backdrop",
        type: ["Boolean"],
        default: "false",
        description:
          "If true modal dialog cannot be closed by clicking outside of it",
      },
      {
        prop: "position",
        type: ["String"],
        default: "top",
        description: "Modal position. Valid values are: 'top' or 'center'",
      },
      {
        prop: "size",
        type: ["String"],
        default: "md",
        description: "Modal size. Valid values are: 'sm', 'md', 'lg' or 'xl'",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade-slide",
        description:
          "Sets animation effect when showing or hiding modal. Valid values are: 'fade', 'fade-slide' or 'fade-scale'",
      },
      {
        prop: "name",
        type: ["String"],
        default: "modal",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-modal",
        description: "Style of modal window",
      },
      {
        prop: "style-header",
        description: "Style of modal header",
      },
      {
        prop: "style-content",
        description: "Content part of modal window",
      },
      {
        prop: "style-backdrop",
        description:
          "Style of backdrop. Useful mainly for setting tint and opactity for modal background",
      },
    ]);

    let events = ref([
      {
        prop: "update:modelValue",
        description: "Update v-model",
      },
      {
        prop: "input:primaryButtonClick",
        description: "Emmited after clicking primary button",
      },
      {
        prop: "input:secondaryButtonClick",
        description: "Emmited after clicking secondary button",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description: "Slot for modal content",
      },
      {
        prop: "footer",
        description:
          "Modal footer content",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
      exampleModalCode,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
