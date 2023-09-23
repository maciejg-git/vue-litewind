#### Usage {#GridUsage}

Grids components can be used to make flexbox layouts. Here is how it works.
- The elements, features and design is inspired by and very similar to Bootstrap grids. It uses flexbox and series of containers, rows and columns to make layouts. Content must be placed within columns and only columns may be immediate children of rows.
- `v-container`, `v-row` and `v-col` are used to make elements of the grid. Those components are just simple, single divs and have all the necessary classes by default.
- tailwind classes are then added to `v-container`, `v-row` and `v-col` to define widths, alignment, gutters and many other properties of the grid. Use responsive modifiers to make grids that change depending on the screen size.

<v-divider></v-divider>

#### Example - simple {#ExampleGridSimple}

Basic 12 columns layout with percentage widths similar to Bootstrap.

<div class="example">
  <example name="ExampleGridSimple"></example>
</div>

#### Example - column wrapping {#ExampleGridWrap}

By default columns that overflow row are wrapped to the next line.

<div class="example">
  <example name="ExampleGridWrap"></example>
</div>

To disable default column wrapping add `flex-nowrap` class to the `v-row`.

<div class="example">
  <example name="ExampleGridNowrap"></example>
</div>

#### Example - auto width columns {#ExampleGridAuto}

Adding `grow` class to `v-cols` will generate columns that fit available space in the row.

<div class="example">
  <example name="ExampleGridAuto"></example>
</div>

To wrap auto width columns to a new line use `v-col-break` component.

<div class="example">
  <example name="ExampleGridAutoBreak"></example>
</div>

Auto width columns can be used with columns that have explicit width. Auto width columns will automaticaly resize to fit into available space.

<div class="example">
  <example name="ExampleGridAutoMix"></example>
</div>

#### Example - variable width columns {#ExampleGridVariable}

Use `basis-auto` class to make columns that have size based on the natural width of their content.

<div class="example">
  <example name="ExampleGridVariable"></example>
</div>

#### Example - responsive column width {#ExampleGridResponsive}

To create responsive grid simply add responsive modifiers (`md:`, `lg:` etc) to `basis-*` classes.

<div class="example">
  <example name="ExampleGridResponsive"></example>
</div>

#### Example - columns break {#ExampleGridBreak}

To break columns to a new line use the `v-col-break` component.

<div class="example">
  <example name="ExampleGridBreak"></example>
</div>

To break columns only at certain breakpoints use `hidden` and `block` classes with the responsive modifiers. In the example below columns only break at small screens.

<div class="example">
  <example name="ExampleGridBreakResponsive"></example>
</div>

#### Example - row horizontal alignment {#ExampleGridAlignHorizontal}

To align columns along horizontal axis use `justify-*` classes in the row.

<div class="example">
  <example name="ExampleGridAlignHorizontal"></example>
</div>

#### Example - row vertical alignment {#ExampleGridAlignVertical}

To align columns along vertical axis use `items-*` classes in the row. You can also align columns seperately with `self-*` classes.

<div class="example">
  <example name="ExampleGridAlignVertical"></example>
</div>

#### Example - gutters {#ExampleGridGutter}

By default columns are not separated by gutter. You can add it using padding classes and then offset it with equal negative margin classes in the row. In the example below `[&>*]:` modifier is used to add equal padding to entire row but you can also set it seperately for each column. For more info on custom modifiers see [tailwind documentation](https://tailwindcss.com/docs/hover-focus-and-other-states#using-arbitrary-variants)

  <v-alert
    icon="info"
    mod-alert="variant:info"
  >
    Note that
    <code class="code-text">space-*</code>
    ,
    <code class="code-text">gap-*</code>
    and
    <code class="code-text">divide-*</code>
    classes will not work reliably and will result in overflow or break
    column wrapping. However, those classes can be used on
    <code class="code-text">v-container</code>
    to create horizontal gutters that separate
    <code class="code-text">v-rows</code>.
  </v-alert>

<div class="example">
  <example name="ExampleGridGutter"></example>
</div>

Gutters can also be made responsive. In the following example gutters get narrower on lower resolutions and are disabled on small screens.

<div class="example">
  <example name="ExampleGridGutterResponsive"></example>
</div>

#### Example - columns position with margin classes {#ExampleGridMargin}

You can shift or center columns with `ml-auto` , `mr-auto` or `mx-auto` margin utility classes.

<div class="example">
  <example name="ExampleGridMargin"></example>
</div>

#### Example - nested layouts {#ExampleGridNested}

Grids can also be nested by placing `v-rows` inside `v-cols` .

<div class="example">
  <example name="ExampleGridNested"></example>
</div>

#### Example - column order {#ExampleGridOrder}

`order-*` classes can be used to change order of columns.

<div class="example">
  <example name="ExampleGridOrder"></example>
</div>
