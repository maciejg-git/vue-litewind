<template>
  <h3>Installation</h3>
  <p></p>

  <section>
    <h5>Installation</h5>
    <p></p>
    <pre>
      <code>
      npm -i vue-tailwind
    </code>
  </pre>
  </section>

  <section>
    <h5>Setting up</h5>
    <p>
    By default does not come with any styling, only the necessary classes are added internally to properly display components. Those classes does not set or change any color, typoghraphy, border, rounding etc. In order to add those copy style-default.js to the src directory of your project and modify it accordingly. See styling for more details about this file.
    </p>
  </section>

  <section>
    <h5>Styling</h5>
    <p>
    </p>
    <pre>
      <code>
// style.js

let component = {
  element: {
    default: [
      "class",
      "class2",
    ],
    variant: [
      "class",
      "class2",
    ],
    variant2: [
      "class",
      "class2",
    ]
  },
  element2: {
    default: [
      "class",
      "class2",
    ],
    variant: [
      "class",
      "class2",
    ],
  },
}
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
