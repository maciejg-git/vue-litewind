<template>
  <h3>Installation</h3>
  <p></p>

  <section>
    <h5>Installation</h5>
    <p></p>

    <v-code language="javascript">
      npm i vue-wind
    </v-code>

    <p>
      Vue-wind uses Tailwindcss as CSS framework. To install Tailwindcss follow
      <a class="link" href="https://tailwindcss.com/docs/installation">
        instruction
      </a>
      in their offical documentation.
    </p>

    <p>
      <span class="font-semibold dark:font-bold dark:text-text-500">[Option if using form components]</span>
      Install
      <a class="link" href="https://github.com/tailwindlabs/tailwindcss-forms">
        @tailwindcss/forms
      </a>
      plugin that provides a basic reset for form styles that makes form
      elements easy to override with utilities.
    </p>

    <v-code language="javascript">
      npm i @tailwindcss/forms
    </v-code>

    <p>
      Configure Tailwind: add dark mode option, extend color definitions and <span class="font-semibold dark:font-bold dark:text-text-500">(optional)</span> add forms plugin in tailwind.config.js:
    </p>

    <v-code language="javascript">
      {{ `const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.gray,
        info: colors.blue,
        warn: colors.yellow,
        success: colors.green,
        danger: colors.red,
        dark: colors.neutral,
        light: colors.white,
        text: colors.gray,
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} `}}
    </v-code>

    <p>
      Import css files:
      <code class="code-text">style.css</code> contains fixed classes,
      <code class="code-text">components.css</code> and <code class="code-text">form.css</code> contains customizable classes for components and forms. You can import it directly or copy from <code class="code-text">'node_modules/vue-wind/dist/'</code> to the directory of application for customization. You can also import or copy css files seperately for each component for smaller build.
    </p>

    <v-code language="javascript">
      {{ `// main.js

import "./components.css";
import "./form.css";

// or

import "./button.css";
import "./table.css";
import "./input.css";

// import fixed styles, order of imports is important
import "vue-wind/dist/style.css" `}}
    </v-code>

    <p>
      Register selected or all components in application entry file (for example main.js)
    </p>

    <v-code language="javascript">
      {{ `// main.js

// register all components

import { componentPlugin } from "vue-wind";
import { components} from "vue-wind";

let app = createApp(App);

app.use(componentPlugin, {
  components,
}); `}}
    </v-code>


    <v-code language="javascript">
      {{ `// main.js

// register selected components

import { componentPlugin } from "vue-wind";
import { vButton, vSelect } from "vue-wind";

let app = createApp(App);

app.use(componentPlugin, {
  components: {
    vButton,
    vSelect,
  }
}); `}}
    </v-code>

    <h5>Styling components</h5>
      <p>
      To customize style of components use following:
      <ul class="list-disc list-inside">
        <li>
      <code class="code-text">tailwind.config.js</code> for color definitions,
        </li>
        <li>
      css file of component (button.css, table.css etc) to customize base classes and variants for components,
        </li>
        <li>
      and following component props that allow selection of active classes:
        </li>
      </ul>
      <ul>
        <li class="my-2">
          <code class="code-text">base</code> - changes base name for styling. The default value is component <code class="code-text">'default'</code>. This can be useful to make new version of appearance with different set of variants.
        </li>
        <li class="my-2">
          <code class="code-text">style-[element]</code> - adds list of variants to elements of component. Variant can be applied conditionaly by putting "identifier:" in front of any variant. Active conditional variant can be chosen with <code class="code-text">variant</code> prop set to identifier. Identifier can be any word and does not have any relation to css. <code class="code-text">Boolean</code>, <code class="code-text">null</code> and <code class="code-text">undefined</code> values of variant prop are automatically converted to strings.
        </li> 
      </ul>
      </p>

      <h5>Example</h5>

      <div class="example">
        <example-install-button />
      </div>

    <v-code :code="ExampleInstallButtonCode" template language="html"></v-code>
    <v-code :code="ExampleInstallButtonCode" script language="js"></v-code>

      <h5>Example</h5>

      <div class="example">
        <example-install-select />
      </div>

    <v-code :code="ExampleInstallSelectCode" template language="html"></v-code>
    <v-code :code="ExampleInstallSelectCode" script language="js"></v-code>
  </section>
</template>

<script>
import ExampleInstallButton from "./examples/ExampleInstallButton.vue"
import ExampleInstallSelect from "./examples/ExampleInstallSelect.vue"
import ExampleInstallButtonCode from "./examples/ExampleInstallButton.vue?raw"
import ExampleInstallSelectCode from "./examples/ExampleInstallSelect.vue?raw"

export default {
  components: {
    ExampleInstallButton,
    ExampleInstallSelect,
  },
  setup() {
    return {
      ExampleInstallButtonCode,
      ExampleInstallSelectCode,
    };
  },
};
</script>

<style scoped>
</style>
