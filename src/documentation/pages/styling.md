#### Styling components {#Styling}

In order to modify default styles of the component start with `tailwind.config.js` file. To make components looks consistent default tailwind colors are extended with named colors like primary, secondary. Change colors accordingly to match your application design.

Second part of the theming are the javascript files. 

Elements of the components are not styled by default and only have necessary basic classes. Additional styles for these elements are defined in the external javascript files.
These files contain list of elements that are available for theming and the strings of tailwind classes assigned to them. Here is a simplified example of such file:

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

On top of that, each element can have a number of variant classes that are applied on certain conditions. These variants are grouped by the type of classes they add to element. By default, group such as shape, size, variant, shadow etc are frequently used. Here is previous example with few additional variants for content element:

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

##### Example - basic styling {#ExampleInstallButton}

<example name="ExampleInstallButton"></example>

<example name="ExampleInstallSelect"></example>
