<template>
  <h3>Alert</h3>
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
      <example-alert></example-alert>
    </div>
    <v-code :code="exampleAlertCode" template language="html"></v-code>
    <v-code :code="exampleAlertCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleAlert from "./examples/ExampleAlert.vue"
import exampleAlertCode from "./examples/ExampleAlert.vue?raw"
import { styleProps } from "./shared-props"

export default {
  components: {
    ExampleAlert,
  },
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
        default: "''",
        description:
          "Alert has few default icons for variants: 'success', 'warn', 'danger', 'info', 'valid', 'invalid'. Icon or default slot can be used for custom icons.",
      },
      ...styleProps("alert"),
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
        prop: "default",
        description: "Slot for alert content",
      },
      {
        prop: "icon",
        description: "Slot for icon prepending message",
      },
    ]);

    return {
      reference,
      styles,
      slots,
      exampleAlertCode,
    };
  },
};
</script>

<style scoped>
</style>
