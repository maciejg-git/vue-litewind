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
  <p><span class="font-semibold">[Option]</span> You can import additional styles</p>
    <pre>
      <code class="language-js">
// main.js

import { styles } from "./styles";
import { stylesMaterial } from "./styles";

let app = createApp(App);

app.provide("styles", {
  default: styles,
  material: stylesMaterial,
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
  <p>In order to apply those styles to components use following props:
  <ul>
    <li class="my-4">theme - sets active theme from themes defined in main.js. Every component by default uses 'default' theme if this prop is not set</li>
    <pre>
      <code class="language-js">
app.provide("styles", {
  default: styles,
  material: stylesMaterial, // &lt;-- theme
})
    </code>
  </pre>
    <pre>
      <code class="language-html">
{{`<v-card theme="material"></v-card>`}}
    </code>
  </pre>
    <li class="my-4">name - name of the component used to get styles from theme. Default name is component name (for example 'button' for v-button). You can set any name that is defined in styles file. This can be useful if you do not want to modify default styles, experiment, using the same component for different purposes etc </li>
    <li class="my-4">style-[element] - this prop is a list of variants to apply to [element] of component. Variant is a collection of Tailwind classes. By default if not set then element uses only 'default' variant. If variant is not found then it is added as class. This can be useful for adding minor variants or prototyping.</li>
    <pre>
      <code class="language-js">
let productCard = { // &lt;-- name
  card: { // &lt;-- element
    default: [ // &lt;-- variant
      "bg-white",
      "border",
      "border-gray-200",
      "rounded",
      "overflow-hidden",
    ],
    shadow: [ // &lt;-- variant
      "shadow-md",
    ],
    square: [ // &lt;-- variant
      "rounded-none",
    ],
  }
}
    </code>
  </pre>
    <pre>
      <code class="language-html">
{{`<v-card name="productCard" style-card="default shadow square"></v-card>`}}
    </code>
  </pre>
  </ul>
  </p>
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
