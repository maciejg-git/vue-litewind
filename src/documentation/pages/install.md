#### Installation {#Installation}

```bash
npm install vue-litewind
```

Vue-litewind uses Tailwindcss as CSS framework. To install Tailwindcss follow [instruction](https://tailwindcss.com/docs/installation/using-postcss) in their offical documentation.

Install [tailwindcss-forms](https://tailwindcss.com/docs/plugins#forms) plugin that provides a basic reset for form styles that makes form elements easy to override with utilities:

```bash
npm install -D @tailwindcss/forms
```
---

#### Configuration {#Configuration}    

**Step 1. Configure Tailwind.**

::: marked-container

Add following to `tailwind.config.js` :

- add vue-litewind to `content` so tailwind can generate utility classes used by components internally,
- add dark mode `class` option,
- extend `colors` definitions. You can chose any colors for primary, secondary etc
- add `tailwindcss-forms` plugin to plugins array

```javascript
// tailwind.config.js

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
}
```

:::

**Step 2. Import styles files:**

::: marked-container

`style.css` contains basic set of classes used by components. Import it directly from library distribution directory

```javascript
// main.js

import "vue-litewind/vue-litewind.css" 
```

In order to make components customizable the rest of the styles are set up in `js` files as tailwind classes. You can import them directly or preferably copy from distribution directory (`node_modules`) to your application for customization. Imported styles need to be provided to the components with the use of the `provide` function. The best place to do it is the root component of the application (for example `App.vue`)

```html
<!-- App.vue -->

<script setup>
  import { provide } from "vue";
  import * as styles from "./styles/components";

  provide("mods", styles);
</script>
```

Read about customizing styles here.

:::

**Step 3. Add vue-litewind plugin:**

::: marked-container

You can register single or all components in application entry file (for example `main.js`). Registering single components will make build smaller.

<v-tabs base="materialTabs">
<v-tab name="All components">

```javascript
// main.js

import { vueLitewind, components, grid, directives } from "vue-litewind";

let app = createApp(App);

app.use(vueLitewind, {
  components,
  grid,
  directives,
});
```

</v-tab>
<v-tab name="Selected components">

```javascript
// main.js

import { vueLitewind } from "vue-litewind";
import { vButton, vSelect } from "vue-litewind";

let app = createApp(App);

app.use(vueLitewind, {
  components: {
    vButton,
    vSelect,
  }
});
```

</v-tab>
</v-tabs>

:::

**Optional** : while registering components you can set default values for props globally in second argument of `app.use`: `componentProps` object. If component has `name` prop that name will be used instead of default name. The value for prop can also be function that takes `base` argument (`base` prop of component) and should return default value for the prop. Note that components can internally use other components and those default props will also apply to them. You can set defaults for those components only by nesting them under their parent components.

<v-alert
  icon="warn"
  mod-alert="special:outline variant:warn shadow:medium"
  class="mx-6 my-8"
>
  Note that you can set default value for some props only.
</v-alert>

Examples of default component props:

<v-tabs base="materialTabs">
<v-tab name="Simple example">

```javascript
// main.js

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
});
```

</v-tab>
<v-tab name="Functions">

```javascript
// main.js

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
});
```

</v-tab>
<v-tab name="Nested defaults">

```javascript
// main.js

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
});
```

</v-tab>
</v-tabs>
