<template>
  <h3>Installation</h3>
  <p></p>

  <section>
    <h5>Definition</h5>
    <span class="font-bold">Type</span>: <code class="code-word">Array</code>
    <p></p>
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
    onMounted(() => {
      hljs.highlightAll();
    });

    return {
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
