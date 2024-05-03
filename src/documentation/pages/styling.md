#### Styling components {#Styling}

###### Colors

In order to modify default styles of the component start with `tailwind.config.js` file. To make components looks consistent default tailwind colors are extended with named colors like primary, secondary. Change colors accordingly to match your application design.

```javascript
// tailwind.config.js

const colors = require('tailwindcss/colors')

module.exports = {
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
  ...
}
```

---

###### Styling elements

The basic ideas of styling are:

- components exposes some of their elements (that make sense to style) as the `string` props 
- these props are used to apply tailwind classes to the elements, however, to make styling flexible and reusable classes are grouped in `objects` as variants and defined in seperate files
- edit these files to define new or modify current variants
- apply variants to the components with props as necessary

The more detailed explanation:

Elements of the components are not styled by default and only have necessary basic classes. Additional styles for these elements are defined in the external javascript files.
These files contain list of elements that are available for theming and the strings of tailwind classes assigned to them. Below is a simplified example of such file:

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

This is basis for all components and those classes are always applied to the elements. 

###### Variant classes

On top of that, each element can have a number of variant classes that are applied on certain conditions. These variants are mostly useful for components that are frequently used in various configurations like buttons, badges, alerts, cards etc. Some components automatically apply variants based on the state of the element. Variants are grouped by the type of classes they add to element, for example by default, group such as shape, size, variant, shadow etc are frequently used. 

Here is previous example with few additional variants added for content element:

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

###### Applying variant classes

Here are three ways these variants can be applied to the element:

- explicitly by using `mod-[element]` prop of the component:
    ```html
    <v-button mod-button="variant:secondary size:small">Secondary</v-button>
    ```
- automatically added by components for variants like selected, active etc,
- automatically added by components when the state of the component maches variant name, for example, invalid variant will always be applied if the `v-input` component state is `'invalid'`
- when no variants are provided in the prop or added automatically then first variant on the list is applied as default. This can be disabled with the `optional` property added to the variant.

###### Special variants

Apart from these basic variants there are three reserved variant names that have special meaning and are applied in a different way:

- `preset` - if any variant from the preset group is applied by the `mod-[element]` prop only those classes will be added to the element. Other variants and static element classes will be ignored. Presets can be useful for frequently used set of variants or when element have many custom classes that are not included in variants and in many other cases. Note that however other variants are ignored you can still reference them in presets by using `function` as variant value.
- `state` - those variants are automatically applied only if the component is in cetrain state, for example when input is invalid.
- `data` - is a `function` that allows styling based on the components data. It is only supported on the elements that have some data associated with them, for example table rows or cells, tree items etc.

---

###### Component props

There are two kinds of props that are used modify style of the particular instance of the component:

- `base` - some components export more than one style object with different set of static and variant classes. This prop allows to select which one is applied to the component. The default value is always the components name.
- `mod-[element]` - adds list of variant classes to the `[element]` of component. Variant can be applied conditionaly by putting `'condition?'` in front of any variant. Active conditional variant can then be chosen with the `variant` prop. Identifier can be any word and does not have any relation to the CSS.

    ```html
    <v-button
      mod-button="new?variant:danger visited?variant:secondary size:small"
      :variant="variant"
      @click="variant = 'visited'"
    >
      "Click me"
    </v-button>
    ```

---

##### Example - basic styling {#ExampleInstallButton}

<example name="ExampleInstallButton"></example>

<example name="ExampleInstallSelect"></example>
