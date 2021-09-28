<template>
  <h3>Icon</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>
  </section>

  <section>
    <h5>Icons source</h5>
    <p>
      <code>v-icon</code>
      uses icon components from this repo. Check documentation on how to
      install, import and use them.
    </p>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-icon></example-icon>
    </div>
    <v-code :code="exampleIconCode" template language="html"></v-code>
  </section>

  <section>
    <h5>Icon types</h5>
    <p>
      Provide icon types via provide function in application entry file
      (typically main.js) or anywhere in top level component. Icon type is
      Object that maps icon name to any name. It can be useful in some ways for
      example to define easy to remember aliases for frequently used icons,
      changing icons application wide, define icons for various states and bind
      with states of components etc. Also those icons have
      <code>icon--[type]-type</code>
      class.
    </p>
    <pre>
      <code class="language-js">
app.provide("iconTypes", {
  valid: "check-icon",
  invalid: "exclamation-triangle-icon",
  success: "check-lg-icon",
  info: "info-circle-icon",
  danger: "exclamation-octagon-fill-icon",
  warn: "exclamation-triangle-icon",
  light: "info-circle-icon",
  menu: "three-dots-icon",
  question: "question-circle-icon",
})
      </code>
    </pre>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleIcon from "./examples/ExampleIcon.vue";
import exampleIconCode from "./examples/ExampleIcon.vue?raw";

export default {
  components: {
    ExampleIcon,
  },
  setup() {
    let reference = ref([
      {
        prop: "icon",
        type: ["String"],
        default: "undefined",
        description:
          "Name of the imported and registered icon. This prop have two aliases 'name' and 'i' (for example <code>&lt;icon name='icon name' /&gt;</code>)",
      },
      {
        prop: "icon-type",
        type: ["String"],
        default: "undefined",
        description: "Icon type provided via iconTypes",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "empty string",
        description:
          "Transition when icon shows or changes. Valid transitions are 'fade', 'fade-scale-down', 'fade-scale-up' and empty string for no transition (default)",
      },
    ]);

    return {
      reference,
      exampleIconCode,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
