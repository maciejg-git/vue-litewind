<template>
  <h3>Form text helper</h3>
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
    <h4>Messages</h4>
    <span class="font-bold">Type</span>
    :
    <code class="code-word">Object</code>
<v-code language="js">
  {{ `let messages = {
  valid: "OK",
  invalid: "This field cannot be empty",
  default: "Username",
};` }}
</v-code>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-form-text></example-form-text>
    </div>
    <v-code :code="exampleFormTextCode" template language="html"></v-code>
    <v-code :code="exampleFormTextCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleFormText from "./examples/ExampleFormText.vue";
import exampleFormTextCode from "./examples/ExampleFormText.vue?raw";
import { styleProps } from "./shared-props"

export default {
  components: {
    ExampleFormText,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "state",
        type: ["String"],
        default: "empty string",
        description:
          "Current state. Most useful if form text uses the same state as input.",
      },
      {
        prop: "inline",
        type: ["Boolean"],
        default: "false",
        description: "Inline-flex version of the form text. Default is flex.",
      },
      {
        prop: "visible-states",
        type: ["String"],
        default: "default,invalid,valid",
        description:
          "List of coma seperated states. If state is one of those states then form text is visible",
      },
      {
        prop: "messages",
        type: ["Object"],
        default: "{}",
        description:
          "Object with messages to display depending on current state. To display those messages default slot must not be used",
      },
      ...styleProps("form-text"),
    ]);

    let styles = ref([
      {
        prop: "style-form-text",
        description: "Text element",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description:
          "Slot for the text. <p class='mt-4'>Slot props: <code class='code-word'>state</code></p>",
      },
      {
        prop: "prepend-message",
        description:
          "Slot for the content in front of a message, for example for an icon. <p class='mt-4'>Slot props: <code class='code-word'>state</code></p>",
      },
    ]);

    return {
      reference,
      styles,
      slots,
      exampleFormTextCode,
    };
  },
};
</script>

<style scoped>
</style>
