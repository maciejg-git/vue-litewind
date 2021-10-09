<template>
  <h3>Installation</h3>
  <p></p>

  <section>
    <h5>Installation</h5>
    <p></p>
    <pre>
      <code>
npm i vue-wind
    </code>
  </pre>
    <p>
      Vue-wind uses Tailwindcss as CSS framework. To install Tailwindcss
      follow
      <a class="link" href="https://tailwindcss.com/docs/installation">
        instruction
      </a>
      in their offical documentation.
    </p>
    <p>
      <span class="font-semibold">[Option if using form components]</span> Install 
      <a class="link" href="https://github.com/tailwindlabs/tailwindcss-forms">
        @tailwindcss/forms
      </a> 
      plugin that provides a basic reset for form styles that makes form elements easy to override with utilities.
    </p>
    <pre>
      <code>
npm i @tailwindcss/forms
    </code>
  </pre>
    <p>
      <span class="font-semibold">[Option 1]</span>
      Register all components in application entry file (for example main.js)
    </p>
    <pre>
      <code class="language-js">
// main.js

import { install } from "vue-wind";

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

import { buttonPlugin, selectPlugin, spinnerPlugin } from "vue-wind";

let app = createApp(App);

app.use(buttonPlugin);
app.use(selectPlugin);
app.use(spinnerPlugin);
    </code>
  </pre>
    <p>
    Copy styles.css from 'node_modules/vue-wind/dist/' to the src directory of your project and import it. You can edit this file to customize look of components.
    </p>
    <pre>
      <code class="language-js">
// main.js

// copy styles.css to src directory of your project and modify to your liking
import "./styles.css";

// import fixed styles, order of importing is important
import "vue-wind/dist/style.css"
    </code>
  </pre>
    <h5>Styling</h5>
  <p>Class begin with default component name, followed by element name and variants/states. You can set custom name for component using name prop. This can be useful if you do not want to modify default styles or use same component for different purposes.</p>
  <p><span class="font-semibold">style-[element]</span> props are used to modify style of component elements using variants. You can list any number of variants. Use <span class="font-semibold">only variant name</span>, do not include component name or element name.</p>
    <pre>
      <code class="language-html">
&lt;v-button&gt;Default button&lt;/v-button&gt;
&lt;v-button style-button=&quot;large&quot;&gt;Large button&lt;/v-button&gt;
&lt;v-button style-button=&quot;primary&quot;&gt;Normal button&lt;/v-button&gt;
&lt;v-button style-button=&quot;primary small &quot;&gt;Small outline button&lt;/v-button&gt;
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
