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
    <p>Provide icon types via provide function in application entry file (typically main.js) or anywhere in top level component. Icon type is Object that maps icon name to any name. It can be useful in many ways for example define easy to remember aliases for frequently used icons, easier use of fonts from different vendors, define icons for various states and bind with states of components etc.</p>
    <pre>
    <code class="language-js">
app.provide("iconTypes", {
  valid: "check",
  invalid: "exclamation-triangle",
  success: "check",
  info: "info-circle",
  light: "info-circle",
  danger: "exclamation-triangle",
  warn: "exclamation-triangle",
})
    </code>
    </pre>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <v-icon icon="star" />
      <v-icon icon="check" />
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import hljs from "highlight.js";

export default {
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

    let example = reactive({});

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      example,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
