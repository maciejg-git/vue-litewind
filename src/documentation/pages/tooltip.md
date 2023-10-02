___

#### Usage {#TooltipUsage}

To show tooltip when hovering over html element use the `v-tooltip` directive. There are three possible ways to set directive value: `string`, `function` or `object` :

```html
<button v-tooltip="'Tooltip text'">Button</button>
```

```html
<button v-tooltip="() => 'Tooltip text'">Button</button>
```

```html
<button v-tooltip="{ text: 'Tooltip text' }">Button</button>
```

If value is an object additional options can be set:

```html
<button v-tooltip="{ 
  placement: string,
  offsetX: number,
  offsetY: number,
  flip: boolean,
  delay: number,
  autoPlacement: boolean,
  transition: string,
  inline: boolean,
  text: string | function | undefined,
}">
  Button
</button>
```

For undefined text property content of `data-title` attribute will be used.

---

#### Examples {#TooltipExamples}

Default tooltip:

<example name="ExampleTooltipSimple"></example>

Tooltip placement:

<example name="ExampleTooltipPlacement"></example>

Tooltip delay:

<example name="ExampleTooltipDelay"></example>

Tooltip content source:

<example name="ExampleTooltipContent"></example>

Tooltip animation:

<example name="ExampleTooltipAnimation"></example>
