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

---

#### Styling components {#Styling}

In order to modify default styles of the component start with `tailwind.config.js` file. To make components looks consistent default tailwind colors are extended with named colors like primary, secondary. Change colors accordingly to match your application design.

Second part of the theming are the javascript files. These files contain list of elements that are available for theming and strings of tailwind classes assigned to them. Here is simplified example of such file:

```javascript
let component =  {
  header: {
    classes: `
      class,
      class2,
    `,
  },
  content: {
    classes: `
      class,
      class2,
    `,
  },
  footer: {
    classes: `
      class,
      class2,
    `,
  },
}
```

This is basis for all components and those classes are always applied to element. 

On top of that, each element can have a number of variant classes that are applied on certain conditions. These variants are grouped by the type of classes they add to element. Here is previous example with few additional variants for content element:

```javascript
let component =  {
  header: {
    ...
  },
  content: {
    classes: `
      class,
      class2,
    `,
    variant: {
      primary: `
        class,
        class2,
      `,
      secondary: `
        class,
        class2,
      `,
    },
    size: {
      medium: `
        class,
        class2,
      `,
      small: `
        class,
        class2,
      `,
    },
  },
  footer: {
    ...
  },
}
```

Here are three ways these variants can be applied to the element:

- explicitly by using `mod-[element]` prop of the component:
    ```html
    <v-button mod-button="variant:secondary size:small">Secondary</v-button>
    ```
- automatically added by components for variants like selected, active etc,
- when no variants are specified or added automatically first variant on the list is applied as default.

Apart from these basic variants there are three reserved variant names that have special meaning and are applied in different way:

- `preset` - if any variant from preset group is applied by `mod-[element]` prop only those classes will be added to element. Static element classes and the rest of the variants will be ignored. Presets can be useful for frequently used set of variants or when element have many custom classes that are not included in variants and in many other cases. Note that however variants are ignored you can still reference them in presets by using `function` as variant value.
- `state`
- `data` - is a `function` that allows styling based on component data. It is only supported on elements that have data associated with them, for example table rows or cells, tree items etc.

and following component props:

- `base` - every component can have multiple versions with different set of
variants exported from js file. This prop allows to select active version
applied to the component. The default value is always component name.
- `mod-[element]` - adds list of variant classes to the `[element]` of component. Variant can be applied conditionaly by putting "identifier:" in front of any variant. Active conditional variant can then be chosen with `variant` prop set to identifier. Identifier can be any word and does not have any relation to css.

---

##### Example - styling with base, style and variant props {#ExampleStyling}

<example name="ExampleInstallButton"></example>

<example name="ExampleInstallSelect"></example>
