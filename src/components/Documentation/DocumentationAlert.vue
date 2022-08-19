<template>
  <h3>Alert</h3>
  <p></p>

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
      <example name="ExampleAlert"></example>
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
        description: "Visiblity state of alert",
      },
      {
        prop: "dissmisable",
        type: ["Boolean"],
        default: "true",
        description:
          "If false close button is not rendered and alert cannot be dissmised",
      },
      {
        prop: "dismiss-delay",
        type: ["Number"],
        default: "0",
        description:
          "Delay after which alert is closed (<code class='code-word'>v-model</code> is set to <code class='code-text'>false</code>)",
      },
      {
        prop: "icon",
        type: ["String"],
        default: "empty string",
        description:
          "Alert has few default icons for variants: 'success', 'warn', 'danger', 'info', 'valid', 'invalid'. Icon or default slot can be used for custom icons.",
      },
      ...styleProps(),
    ]);

    let styles = ref([
      {
        prop: "style-alert",
        description: "Main alert element",
      },
      {
        prop: "style-icon",
        description: "Default icon element (does not apply to icons in slot)",
      },
    ]);

    let slots = ref([
      {
        slot: "default",
        description: "Slot for alert content",
      },
      {
        slot: "icon",
        description: "Slot for icon prepending message",
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
