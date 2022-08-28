<template>
  <h3>Modal</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <h6>Events</h6>
    <table-reference-basic :items="events" reference="event" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />
  </section>

  <section>
    <h4>Notes</h4>
    <p>
    <ul class="flex flex-col gap-y-7">
      <li>
        <header class="font-semibold text-lg mb-2">
          <span>#</span>
          Modal activation
        </header>
        To control modal visibility you can use <code class="code-text">v-model</code> or <code class="code-text">v-trigger</code> component
      </li>
      <li>
        <header class="font-semibold text-lg mb-2">
          <span>#</span>
          Teleport
        </header>
        Open modal is by default appended to the body element
      </li>
    </ul>
    </p>
  </section>

  <section>
    <h4>Example - simple modal</h4>
    <div class="example">
      <example name="ExampleModalSimple"></example>
    </div>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleModal"></example>
    </div>
  </section>

  <section>
    <h4>Example - open by id</h4>
    <p>
    You can also control state of the modal by using <code class="code-text">v-trigger</code> component. The for prop of the <code class="code-text">v-trigger</code> should be the same as <code class="code-text">id</code> of the modal. <code class="code-text">v-triggers</code> can be put anywhere in application.
    </p>
    <div class="example">
      <example name="ExampleModalTrigger" :script="false"></example>
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
        prop: "v-model",
        type: ["Boolean"],
        default: "false",
        description: "Set v-model to true to show modal or false to hide it. Model is optional if dropdown is activated from v-trigger component",
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
        prop: "primary-button",
        type: ["Object"],
        default: "{ styleButton: 'primary' }",
        description: "Attributes of primary v-button component. See documentation for valid values",
      },
      {
        prop: "secondary-button",
        type: ["Object"],
        default: "{ styleButton: 'secondary' }",
        description: "Attributes of secondary v-button component. See documentation for valid values",
      },
      {
        prop: "primary-button-label",
        type: ["String"],
        default: "'OK'",
        description: "Label of primary button",
      },
      {
        prop: "secondary-button-label",
        type: ["String"],
        default: "'Cancel'",
        description: "Label of secondary button",
      },
      {
        prop: "primary-button-close",
        type: ["Boolean"],
        default: "false",
        description:
          "If true clicking primary button emits @input:secondaryButtonClick event and closes modal. If false modal is not closed after emitting event",
      },
      {
        prop: "secondary-button-close",
        type: ["Boolean"],
        default: "false",
        description:
          "If true clicking primary button emits @input:primaryButtonClick event and closes modal. If false modal is not closed after emitting event",
      },
      {
        prop: "justify-buttons",
        type: ["String"],
        default: "false",
        description:
          "Use this prop to place buttons in footer. Valid values are: 'start', 'end', 'center', 'between', 'around', 'evenly'",
      },
      {
        prop: "no-close-button",
        type: ["Boolean"],
        default: "false",
        description: "Disables 'X' button in modal header",
      },
      {
        prop: "close-button-in-content",
        type: ["Boolean"],
        default: "false",
        description: "Renders absolute positioned close button inside content container (instead of header). This can be useful if header is disabled or when showing images that span entire modal. See such example below.",
      },
      {
        prop: "static-backdrop",
        type: ["Boolean"],
        default: "false",
        description:
          "If true modal dialog cannot be closed by clicking outside of it",
      },
      {
        prop: "no-header",
        type: ["Boolean"],
        default: "false",
        description:
          "Do not render header if `true`",
      },
      {
        prop: "no-footer",
        type: ["Boolean"],
        default: "false",
        description:
          "Do not render footer if `true`",
      },
      {
        prop: "position",
        type: ["String"],
        default: "'top'",
        description: "Modal position. Valid values are: 'top' or 'center'",
      },
      {
        prop: "size",
        type: ["String"],
        default: "'md'",
        description: "Modal size. Valid values are: 'sm', 'md', 'lg', 'xl' or 'fit' ",
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
          "Sets animation effect when showing or hiding modal. Valid values are: 'fade-[speed]', 'fade-slide-[speed]' or 'fade-scale-[speed]' where speed is 'f', 'm' or 's' for example 'fade-m' or 'fade-slide-f'. Empty string disables animations.",
      },
      ...styleProps(),
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
        event: "input:primary-button-click",
        description: "Emmited after clicking primary button",
      },
      {
        event: "input:secondary-button-click",
        description: "Emmited after clicking secondary button",
      },
      {
        event: "input:static-backdrop-click",
        description: "Emmited after clicking backdrop if `static-backdrop` prop is `true`",
      },
    ]);

    let slots = ref([
      {
        slot: "default",
        description: "Modal content",
      },
      {
        slot: "header",
        description:
          "Modal header content",
      },
      {
        slot: "footer",
        description:
          "Modal footer content",
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
