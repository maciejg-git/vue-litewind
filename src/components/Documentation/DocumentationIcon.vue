<template>
  <h3>Icon</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>
  </section>

  <section>
    <h5>Icon types</h5>
    <p>Provide icon types via provide function in application entry file (typically main.js) or anywhere in top level component. Icon type is Object that maps icon name to any name. It can be useful in some ways for example to define easy to remember aliases for frequently used icons, changing icons app wide, define icons for various states and bind with states of components etc. Also those icons have <code>icon--[type]-type</code> class.</p>
    <pre>
    <code class="language-js">
app.provide("iconTypes", {
  valid: "check",
  invalid: "exclamation-triangle",
  success: "check",
  info: "info-circle",
  danger: "exclamation-octagon-fill",
  warn: "exclamation-triangle",
  light: "info-circle",
  menu: "three-dots",
  question: "question-circle",
})
    </code>
    </pre>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-icon></example-icon>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleIcon from "./examples/ExampleIcon.vue"

export default {
  components: {
    ExampleIcon,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "icon",
        type: ["String"],
        default: "undefined",
        description: "Name of the imported and registered icon",
      },
      {
        prop: "icon-type",
        type: ["String"],
        default: "undefined",
        description: "Icon type provided via iconTypes",
      },
    ]);

    return {
      reference,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
