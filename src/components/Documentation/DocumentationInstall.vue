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
    <p>Register all components in app entry file eg main.js</p>
    <pre>
      <code class="language-js">
// main.js

import plugin from "vue-tailwind";

let app = createApp(App);

app.use(plugin);
    </code>
  </pre>
    <p>or register only selected components</p>
    <pre>
      <code class="language-js">
// main.js

import { buttonPlugin, selectPlugin, spinnerPlugin } from "vue-tailwind";

let app = createApp(App);

app.use(buttonPlugin);
app.use(selectPlugin);
app.use(spinnerPlugin);
    </code>
  </pre>
  </section>

  <section>
    <h5>Setting up</h5>
    <p>
      By default does not come with any styling, only the necessary classes are
      added internally to properly display components. Those classes does not
      set or change any color, typoghraphy, border, rounding etc. In order to
      add those copy style.js to the src directory of your project and import it
      in main.js. See styling for more details about this file.
    </p>
    <pre>
      <code class="language-js">
// main.js

import { styles } from "./styles";

let app = createApp(App);

app.config.globalProperties.styles = {
  default: styles,
};
    </code>
  </pre>
  </section>

  <section>
    <h5>Styling</h5>
    <p></p>
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

    return {};
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
