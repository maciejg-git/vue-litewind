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
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleAlert from "./examples/ExampleAlert.vue"

export default {
  components: {
    ExampleAlert,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Boolean"],
        default: "false",
        description: "Visiblity state of alert",
      },
      {
        prop: "dismiss-delay",
        type: ["Number"],
        default: "0",
        description:
          "Delay after which alert is closed (<code class='code-word'>v-model</code> is set to <code>false</code>)",
      },
      {
        prop: "name",
        type: ["Array"],
        default: "undefined",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-alert",
        description: "Main alert element",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description: "Slot for alert content",
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
@import "./Documentation.css";
</style>
