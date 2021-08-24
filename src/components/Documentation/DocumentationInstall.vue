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
    <p>
      Vue-tailwind uses Tailwindcss as CSS framework. To install Tailwindcss
      follow
      <a class="link" href="https://tailwindcss.com/docs/installation">
        instruction
      </a>
      in their offical documentation.
    </p>
    <p>
      <span class="font-semibold">[Option 1]</span>
      Register all components in application entry file (for example main.js)
    </p>
    <pre>
      <code class="language-js">
// main.js

import { install } from "vue-tailwind";

let app = createApp(App);

app.use(install);
    </code>
  </pre>
    <p>
      <span class="font-semibold">[Option 2]</span>
      or register components seperately if you plan to use only selected few or
      single component. This should make your build smaller.
    </p>
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
      added internally to properly display components. Classes that provide
      colors, border, rounding and similar are added seperately in style.js
      file. Copy style.js to the src directory of your project, import it in
      your application entry file and use provide function to make them
      available to components. See styling for more details about this file.
    </p>
    <pre>
      <code class="language-js">
// main.js

import { styles } from "./styles";

let app = createApp(App);

app.provide("styles", {
  default: styles,
})
    </code>
  </pre>
  </section>

  <section>
    <h5>Styling</h5>
    <p></p>
    <pre>
      <code class="language-js">
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
import { onMounted } from "vue";
import hljs from "highlight.js";

export default {
  setup() {
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
