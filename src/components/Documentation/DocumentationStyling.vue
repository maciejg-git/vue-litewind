<template>
  <h3>Styling</h3>
  <p>By default does not come with any styling. Only classes necessary for component are inlcude as fixed classes.</p>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import vTable from "../vTable.vue";

import hljs from "highlight.js";
import "highlight.js/styles/default.css";

export default {
  components: {
    vTable,
  },
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
