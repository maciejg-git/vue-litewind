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
      Vue-wind uses Tailwindcss as CSS framework. To install Tailwindcss follow
      <a class="link" href="https://tailwindcss.com/docs/installation">
        instruction
      </a>
      in their offical documentation.
    </p>
    <p>
      <span class="font-semibold">[Option if using form components]</span>
      Install
      <a class="link" href="https://github.com/tailwindlabs/tailwindcss-forms">
        @tailwindcss/forms
      </a>
      plugin that provides a basic reset for form styles that makes form
      elements easy to override with utilities.
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
      or register component plugins seperately. This should make your build
      smaller.
    </p>
    <pre>
      <code class="language-js">
// main.js

import { buttonPlugin, selectPlugin } from "vue-wind";

let app = createApp(App);

app.use(buttonPlugin);
app.use(selectPlugin);
    </code>
  </pre>
    <p>
      Copy styles.css from 'node_modules/vue-wind/dist/' to the src directory of
      your project and import it. You can edit this file to customize look of
      components.
    </p>
    <pre>
      <code class="language-js">
// main.js

// copy styles.css to src directory of your project and modify it to your liking
import "./styles.css";

// import fixed styles, order of imports is important
import "vue-wind/dist/style.css"
    </code>
  </pre>
    <h5>Styling components</h5>
      <p>
      To customize appearance of components use following:
      <ul class="list-disc list-inside">
        <li>
      <span class="font-semibold">style.css</span> file that contains base classes and variants
        </li>
        <li>
      and following <span class="font-semibold">component props</span> that allow selection of base and variant classes per component:
        </li>
      </ul>
      <ul>
        <li class="my-2">
          <span class="font-semibold">base</span> - sets base name. The default value is component name ("button", "dropdown", "modal" etc...). This can be useful to make new version of appearance with different set of variants.
        </li>
        <li class="my-2">
          <span class="font-semibold">style-[element]</span> - this prop allows variant classes to elements of component. Variant can be applied conditionaly by putting "identifier:" in front of any variant. Active conditional variant can be chosen with <span class="font-semibold">variant</span> prop set to identifier. Identifier can be any word and does not have any relation to css.
        </li>
      </ul>
      </p>
      <div class="example">
        <example-install-button />
      </div>
    <v-code :code="exampleButtonCode" template language="html"></v-code>
    <v-code :code="exampleButtonCode" script language="js"></v-code>
  </section>
</template>

<script>
import { onMounted } from "vue";
import ExampleInstallButton from "./examples/ExampleInstallButton.vue"
import exampleButtonCode from "./examples/ExampleInstallButton.vue?raw"
import hljs from "highlight.js";

export default {
  components: {
    ExampleInstallButton,
  },
  setup() {
    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      exampleButtonCode,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
