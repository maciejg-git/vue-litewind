<template>
  <h3>Textarea</h3>
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
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-textarea></example-textarea>
    </div>
    <v-code :code="exampleTextareaCode" template language="html"></v-code>
    <v-code :code="exampleTextareaCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleTextarea from "./examples/ExampleTextarea.vue"
import exampleTextareaCode from "./examples/ExampleTextarea.vue?raw"
import { styleProps, formProps } from "./shared-props"

export default {
  components: {
    ExampleTextarea,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Textarea v-model",
      },
      {
        prop: "rules",
        type: ["Object"],
        default: "{}",
        description: "Rules for validation. See Form Validation for example",
      },
      {
        prop: "validate-on",
        type: ["String"],
        default: "blur",
        description:
          "Valid values are <code class='code-text'>blur</code> or <code class='code-text'>immediate</code>. See Form Validation for explanation and examples",
      },
      {
        prop: "validate-mode",
        type: ["String"],
        default: "silent",
        description:
          "Valid values are <code class='code-text'>silent</code> or <code class='code-text'>eager</code>. See Form Validation for explanation and examples",
      },
      ...formProps(),
      ...styleProps("textarea"),
    ]);

    let styles = ref([
      {
        prop: "style-textarea",
        description: "Main textarea element",
      },
    ]);

    let events = ref([
    ]);

    return {
      reference,
      styles,
      events,
      exampleTextareaCode,
    };
  },
};
</script>

<style scoped>
</style>
