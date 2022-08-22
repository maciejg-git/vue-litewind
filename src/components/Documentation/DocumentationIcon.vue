<template>
  <h3>Icon</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />
  </section>

  <section>
    <h5>Icons source</h5>
    <p>
      <code class="code-text">v-icon</code> uses icon components (registered names or component objects).
    </p>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleIcon" :script="false"></example>
    </div>
  </section>

  <section>
    <h5>Icon types</h5>
    <p>
      Provide <code class="code-text">icon-types</code> via provide function in application entry file or anywhere in top level component. <code class="code-text">icon-type</code> is the <code class="code-text">object</code> that maps icon names (registerd icon component) or icon component objects to any name. It can be useful for example to define easy to remember aliases for frequently used icons, changing icons application wide, define icons for various states of components etc.
    </p>
    <v-code :code="exampleIconMainCode" language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import exampleIconMainCode from "./examples/ExampleIconMain.js?raw";

export default {
  setup() {
    let reference = ref([
      {
        prop: "icon",
        type: ["String", "Object"],
        default: "empty string",
        description:
          "Name of the registered icon component or icon component object. It has higher prorioty than `icon-type` if both are set",
      },
      {
        prop: "name",
        type: ["String", "Object"],
        default: "empty string",
        description:
          "Same as icon prop",
      },
      {
        prop: "icon-type",
        type: ["String"],
        default: "empty string",
        description: "Icon type provided via `iconTypes`",
      },
    ]);

    return {
      reference,
      exampleIconMainCode,
    };
  },
};
</script>

<style scoped>
</style>
