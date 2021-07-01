<template>
  <h3>Styling</h3>
  <p>By default does not come with any styling. Only classes necessary for component are inlcude as fixed classes.</p>
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
