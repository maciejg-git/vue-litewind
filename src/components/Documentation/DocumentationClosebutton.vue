<template>
  <h3>Close button</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <v-close-button />
    </div>
    <pre>
      <code class="language-html">
&lt;v-close-button&gt;&lt;/v-close-button&gt;
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
        prop: "name",
        type: ["String"],
        default: "closebutton",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-close-button",
        description: "Button element",
      },
    ]);

    let example = reactive({});

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      styles,
      example,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
