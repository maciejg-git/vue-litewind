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

<div class="example">
  <example name="ExampleTooltipSimple"></example>
</div>

Tooltip placement:

<div class="example">
  <example name="ExampleTooltipPlacement"></example>
</div>

Tooltip delay:

<div class="example">
  <example name="ExampleTooltipDelay"></example>
</div>

Tooltip content source:

<div class="example">
  <example name="ExampleTooltipContent"></example>
</div>

Tooltip animation:

<div class="example">
  <example name="ExampleTooltipAnimation"></example>
</div>
