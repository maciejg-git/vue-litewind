<template>
  <h3>Installation</h3>

  <section>
    <h4 id="Installation" class="my-10">Installation</h4>

    <v-code language="javascript">
      npm install vue-litewind
    </v-code>

    <p>
      Vue-litewind uses Tailwindcss as CSS framework. To install Tailwindcss follow
      <a class="link" href="https://tailwindcss.com/docs/installation/using-postcss">
        instruction
      </a>
      in their offical documentation.
    </p>
    <p>
      Install <a class="link" href="https://tailwindcss.com/docs/plugins#forms">tailwindcss-forms</a> plugin that provides a basic reset for form styles that makes form elements easy to override with utilities:
    </p>
    <v-code language="javascript">
      npm install -D @tailwindcss/forms
    </v-code>
  </section>

    <v-divider class="my-10"></v-divider>

    <section>
    <h4 id="Configuration" class="my-10">Configuration</h4>
    <span class="font-bold dark:text-text-300">
      Step 1. Configure Tailwind.
    </span>
    <div class="border-l-2 border-dark-500 dark:border-dark-600 pl-8">
    <p>
    Add following to <code class="code-text">tailwind.config.js</code>:
      <ul class="list-disc list-outside ml-10 mt-4">
        <li>
          add vue-litewind to <code class="code-text">content</code> so tailwind can generate  utility classes used by components internally, 
        </li>
        <li>
          add dark mode <code class="code-text">class</code> option, 
        </li>
        <li>
          extend <code class="code-text">colors</code> definitions. You can chose any colors for primary, secondary etc
        </li>
        <li>
          add <code class="code-text">tailwindcss-forms</code> plugin to plugins array
        </li>
      </ul>
    </p>

    <v-code language="javascript">
      {{ `// tailwind.config.js

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    'node_modules/vue-litewind',
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.violet,
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
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
} `}}
    </v-code>
    </div>

      <span class="font-bold dark:text-text-300">
        Step 2. Import styles files:
      </span>
      <div class="border-l-2 border-dark-500 dark:border-dark-600 pl-8">
    <p>
<code class="code-text">style.css</code> contains basic set of classes used by components. Import it directly from library distribution directory
    </p>

    <v-code language="javascript">
      {{ `// main.js

import "vue-litewind/vue-litewind.css" 
`}}
    </v-code>
          In order to make components customizable the rest of the styles are set up in <code class="code-text">js</code> files as tailwind classes. You can import them directly or preferably copy from distribution directory (<code class="code-text">node_modules</code>) to your application for customization. Imported styles need to be provided to the components with the use of the <code class="code-text">provide</code> function. The preferred place to do it is the root component of the application (for example <code class="code-text">App.vue</code>)
    <v-code language="html">
      {{ `<!-- App.vue -->

<script setup>
import { provide } from "vue"
import * as styles from "./styles/components"

provide("mods", styles)
</script>
`}}
    </v-code>
    <p>Read about customizing styles here.</p>
      </div>

    <span class="font-bold dark:text-text-300">
      Step 3. Add vue-litewind plugin:
    </span>
    <div class="border-l-2 border-dark-500 dark:border-dark-600 pl-8">
    <p>
      You can register single or all components in application entry file (for example <code class="code-text">main.js</code>). Registering single components will make build smaller.
    </p>

    <v-tabs base="materialTabs">
      <v-tab name="All components">
    <v-code language="javascript">
      {{ `// main.js

import { vueLitewind, components, grid, directives } from "vue-litewind";

let app = createApp(App);

app.use(vueLitewind, {
  components,
  grid,
  directives,
}); `}}
    </v-code>

      </v-tab>
      <v-tab name="Selected components">
    <v-code language="javascript">
      {{ `// main.js

import { vueLitewind } from "vue-litewind";
import { vButton, vSelect } from "vue-litewind";

let app = createApp(App);

app.use(vueLitewind, {
  components: {
    vButton,
    vSelect,
  }
}); `}}
    </v-code>

      </v-tab>
    </v-tabs>
    </div>

    <p>
      <span class="font-bold">Optional</span>: while registering components you can set default values for props globally in second argument of <code class="code-text">app.use</code>:
        <code class="code-text">componentProps</code> object. If component has <code class="code-text">name</code> prop that name will be used instead of default name. The value for prop can also be function that takes <code class="code-text">base</code> argument (<code class="code-text">base</code> prop of component) and should return default value for the prop. Note that components can internally use other components and those default props will also apply to them. You can set defaults for those components only by nesting them under their parent components.
    </p>

    <v-alert icon="warn" mod-alert="special:outline variant:warn shadow:medium" class="mx-6 my-8">
      Note that you can set default value for some props only.
    </v-alert>

    <div class="my-4">
      Default props examples
    </div>

    <v-tabs base="materialTabs">
      <v-tab name="Simple example">
    <v-code language="javascript">
      {{ `// main.js

import { vueLitewind } from "vue-litewind";
import { components} from "vue-litewind";

let app = createApp(App);

app.use(vueLitewind, {
  components,
  componentProps: {
    input: {
      inline: true,
      singleLineMessage: true,
    },
  }
}); `}}
    </v-code>
      </v-tab>
      <v-tab name="Functions">
    <v-code language="javascript">
      {{ `// main.js

import { vueLitewind } from "vue-litewind";
import { components} from "vue-litewind";

let app = createApp(App);

app.use(vueLitewind, {
  components,
  componentProps: {
    input: {
      inline: (base) => base === "underlined-input" ? true : false,
      singleLineMessage: true,
    },
  }
}); `}}
    </v-code>
      </v-tab>
      <v-tab name="Nested defaults">
    <v-code language="javascript">
      {{ `// main.js

import { vueLitewind } from "vue-litewind";
import { components} from "vue-litewind";

let app = createApp(App);

app.use(vueLitewind, {
  components,
  componentProps: {
    select: {
      inline: true,
      offsetY: 5,
      card: {
        base: "flat-card",
        styleCard: "menu shadow rounded",
      }
    }
  }
}); `}}
    </v-code>
      </v-tab>
    </v-tabs>
    </section>

    <v-divider class="my-10"></v-divider>

    <section>
    <h4 id="Styling" class="my-10">Styling components</h4>
      </section>
      <p>
      Default style of components can be modified by using following:
      <ul class="list-disc list-inside">
        <li>
      <code class="code-text">tailwind.config.js</code> for color definitions,
        </li>
        <li>
      js file with base classes and variants for components,
        </li>
        <li>
      and following component props:
        </li>
      </ul>
      <ul class="ml-10">
        <li class="my-2">
          <code class="code-text">base</code> - every component can have multiple versions with different set of variants exported from js file. This prop allows to select active version applied to the component. The default value is always component name.
        </li>
        <li class="my-2">
          <code class="code-text">mod-[element]</code> - adds list of variant classes to the <code class="code-text">[element]</code> of component. Variant can be applied conditionaly by putting "identifier:" in front of any variant. Active conditional variant can then be chosen with <code class="code-text">variant</code> prop set to identifier. Identifier can be any word and does not have any relation to css.
        </li> 
      </ul>
      </p>

      <section>
        <h5 id="ExampleStyling">Example - styling with base, style and variant props</h5>
        <div class="example">
          <example name="ExampleInstallButton"></example>
        </div>
      </section>

      <section>
        <div class="example">
          <example name="ExampleInstallSelect"></example>
        </div>
      </section>
</template>

<style scoped>
</style>
