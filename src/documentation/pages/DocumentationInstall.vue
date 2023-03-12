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
      Configure Tailwind: 
      <ul class="list-disc list-inside ml-10 mt-4">
        <li>
          add vue-wind to <code class="code-text">content</code> so tailwind can generate classes used by components internally, 
        </li>
        <li>
          add dark mode <code class="code-text">class</code> option, 
        </li>
        <li>
          extend <code class="code-text">colors</code> definitions. You can chose any colors for primary, secondary etc:
        </li>
      </ul>
    </p>

    <v-code language="javascript">
      {{ `// tailwind.config.cjs

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    'node_modules/vue-wind',
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.js',
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
      You can register single or all components in application entry file (for example main.js)
    </p>

    <v-tabs base="material-tabs">
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
      <span class="font-bold">Optional</span>: while registering components (single or all) you can set default values for props globally in second argument of <code class="code-text">app.use</code>:
        <code class="code-text">componentProps</code> object. If component has <code class="code-text">name</code> prop that name will be used instead of default name. The value for prop can also be function that takes <code class="code-text">base</code> argument (<code class="code-text">base</code> prop of component) and should return default value for the prop. Functions and <code class="code-text">name</code> prop can be useful for creating versions of component with different set of defaults. Note that components can internally use other components and those default props will also apply to them. You can set defaults for those components only by nesting them under their parent components.
    </p>
    <p>
    <v-alert icon="warn" style-alert="shadowed marked outline warn" class="mx-6">
      Note that you can set default value for some props only.
    </v-alert>
    </p>

    <v-tabs base="material-tabs">
      <v-tab name="Simple example">
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
      </v-tab>
      <v-tab name="Functions">
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
      </v-tab>
      <v-tab name="Nested defaults">
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
      </v-tab>
    </v-tabs>

    <h5>Styling components</h5>
      <p>
      To customize style of components use following:
      <ul class="list-disc list-inside">
        <li>
      <code class="code-text">tailwind.config.js</code> for color definitions,
        </li>
        <li>
      css file of component to customize base classes and variants for components,
        </li>
        <li>
      and following component props that allow selection of active classes:
        </li>
      </ul>
      <ul class="ml-10">
        <li class="my-2">
          <code class="code-text">base</code> - changes base name for styling. The default value is component name. This can be useful to make new version of appearance with different set of variants.
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
