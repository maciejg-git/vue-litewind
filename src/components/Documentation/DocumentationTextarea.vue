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
