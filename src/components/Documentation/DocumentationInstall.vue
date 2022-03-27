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
      <span class="font-semibold">[Option if using form components]</span>
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
      <span class="font-semibold">[Option 1]</span>
      Register all components in application entry file (for example main.js)
    </p>

    <v-code language="javascript">
      {{ `// main.js

import { install } from "vue-wind";

let app = createApp(App);

app.use(install); `}}
    </v-code>

    <p>
      <span class="font-semibold">[Option 2]</span>
      or register component plugins seperately. This should make your build
      smaller.
    </p>

    <v-code language="javascript">
      {{ `// main.js

import { buttonPlugin, selectPlugin } from "vue-wind";

let app = createApp(App);

app.use(buttonPlugin);
app.use(selectPlugin); `}}
    </v-code>

    <p>
      Copy styles.css from 'node_modules/vue-wind/dist/' to the src directory of
      your project and import it. You can edit this file to customize look of
      components.
    </p>

    <v-code language="javascript">
      {{ `// main.js

// copy styles.css to src directory of your project and modify it to your liking
import "./styles.css";

// import fixed styles, order of imports is important
import "vue-wind/dist/style.css" `}}
    </v-code>

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
import ExampleInstallButton from "./examples/ExampleInstallButton.vue"
import exampleButtonCode from "./examples/ExampleInstallButton.vue?raw"

export default {
  components: {
    ExampleInstallButton,
  },
  setup() {
    return {
      exampleButtonCode,
    };
  },
};
</script>

<style scoped>
</style>
