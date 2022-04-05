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
      the object that allows mapping of icon name or icon component object to any name. It can be useful for
      example to define easy to remember aliases for frequently used icons,
      changing icons application wide, define icons for various states and bind
      with states of components etc. Those icons have
      <code>icon--[type]-type</code>
      class added by default.
    </p>
<v-code language="js">
{{ `app.provide("icon-types", {
  valid: BCheck, // icon component object
  invalid: "exclamation-triangle", // registered icon name
  success: "check-lg",
  info: "info-circle",
  danger: "exclamation-octagon-fill",
  warn: "exclamation-triangle",
  menu: "three-dots",
  question: "question-circle",
}) `}}
</v-code>
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
        type: ["String", "Object"],
        default: "undefined",
        description:
          "Name of the registered icon component or icon component object",
      },
      {
        prop: "name",
        type: ["String", "Object"],
        default: "undefined",
        description:
          "Same as icon prop",
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
