<template>
  <h3>Installation</h3>

  <section>
    <h5>Installation</h5>

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
      Configure Tailwind: add vue-wind to content so tailwind can generate classes used by components internally, add dark mode option, extend color definitions:
    </p>

    <v-code language="javascript">
      {{ `const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    'node_modules/vue-wind'
  ],
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

    <v-tabs base="material">
      <v-tab name="All components">
    <v-code language="javascript">
      {{ `// main.js

import { componentPlugin } from "vue-wind";
import { components, directives } from "vue-wind";

let app = createApp(App);

app.use(componentPlugin, {
  components,
  directives,
}); `}}
    </v-code>

      </v-tab>
      <v-tab name="Selected components">
    <v-code language="javascript">
      {{ `// main.js

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

      </v-tab>
    </v-tabs>

    <p>
      You can configure components globally by providing options in second argument of app.use:
    </p>
    <p>
    <ul>
      <li>
        <code class="code-text">componentProps</code> sets default values for props of components. The value can be function that takes <code class="code-text">base</code> and <code class="code-text">name</code> arguments (<code class="code-text">base</code> and <code class="code-text">name</code> props of component) and should return default value for the prop.
      </li>
    </ul>
    </p>
    <p>
    <v-alert icon="warn" style-alert="shadowed marked outline warn" class="mx-6">
      Note that you can provide default value for some props only.
    </v-alert>
    </p>

    <v-code language="javascript">
      {{ `// main.js

import { componentPlugin } from "vue-wind";
import { components} from "vue-wind";

let app = createApp(App);

app.use(componentPlugin, {
  components,
  componentProps: {
    input: {
      inline: true,
      singleLineMessage: true,
    },
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

      <section>
        <h5>Example - styling</h5>
        <div class="example">
          <example name="ExampleInstallButton"></example>
        </div>
      </section>

      <section>
        <h5>Example - styling</h5>
        <div class="example">
          <example name="ExampleInstallSelect"></example>
        </div>
      </section>
  </section>
</template>

<style scoped>
</style>
