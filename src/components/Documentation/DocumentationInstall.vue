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

    <h5>Styling</h5>

    <p>
      Copy style.css to the src directory of your project, import it and modify to your liking.
    </p>
    <pre>
      <code class="language-js">
// main.js

import "styles.css";
    </code>
  </pre>
    <p>
      <span class="font-semibold">[Option]</span> Import more styles if you want to change them on the fly using name prop.
    </p>
    <pre>
      <code class="language-js">
// main.js

import "styles.css";
import "styles-material.css";
    </code>
  </pre>
  <p>Each class begin with default component name. If you want to use another classes for component set different name for component using name prop. This can be useful if you do not want to modify default classes, experiment, use multiple themes or use same component for different purposes.</p>
  <p><span class="font-semibold">style-[element]</span> components props are used to modify elements of component using css variants. You can list any number of variants. Use <span class="font-semibold">only variant name</span>, do not include component name or element name.</p>
    <pre>
      <code class="language-html">
&lt;v-button&gt;Default button&lt;/v-button&gt;
&lt;v-button style-button=&quot;large&quot;&gt;Large button&lt;/v-button&gt;
&lt;v-button style-button=&quot;primary&quot;&gt;Normal button&lt;/v-button&gt;
&lt;v-button style-button=&quot;primary small outline &quot;&gt;Small outline button&lt;/v-button&gt;
&lt;v-button style-button=&quot;secondary tiny&quot;&gt;Tiny button&lt;/v-button&gt;
    </code>
  </pre>
  <p class="font-semibold">Classes that define state (with -state ending) must always be below variant classes in css to work properly</p>
  <p>
    The final classes applied to element are the result of merging:
    <ul>
    <li class="my-4">
      🔨 <span class="font-semibold">fixed classes hardcoded into components</span>, those are to properly display and interact with components
    </li>
    <li class="my-4">
      🎨 <span class="font-semibold">classes from styles.css</span> those ideally should be only 'visual theme' classes like colors, typography, paddings, focus and hover, rounding, text decorations, borders, transitions etc
    </li>
    <li class="my-4">
      🔧 <span class="font-semibold">classes added as a result of using certain props.</span> Those props add classes in secure, reactive way to proper elements of components for example block prop on button, fill on tabs, position and size on modal, state prop etc
    </li>
    <li class="my-4">
      🚀 <span class="font-semibold">classes defined with class attribute on components</span> those should be avoided as there is no way to tell to which element they apply. Most often it is wrapper element. Should only be used to position component and set margins.
    </li>
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
