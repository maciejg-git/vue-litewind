___

#### Usage {#GridUsage}

The grid is used to make flexbox layouts.

The elements, features and general idea is inspired by and very similar to Bootstrap grids. It uses flexbox and series of containers, rows and columns to make layouts. Content must be placed within columns and only columns may be immediate children of rows.

`v-container`, `v-row` and `v-col` are the components used to make elements of the grid. Those components are just simple, single divs and have all the necessary classes by default.

Tailwind classes are then added to `v-container`, `v-row` and `v-col` to define widths, column alignment, gutters and many other properties of the grid. Most layouts should start with the `basis-*` or `grow` classes to set initial widths of the columns and then add additional features. Prepend these classes with responsive modifiers to make grids that change depending on the screen size.

---

#### Example - simple {#ExampleGridSimple}

Basic 12 columns layout with percentage widths similar to Bootstrap.

<example name="ExampleGridSimple"></example>

#### Example - column wrapping {#ExampleGridWrap}

By default columns that overflow row are wrapped to the next line.

<example name="ExampleGridWrap"></example>

To disable default column wrapping add `flex-nowrap` class to the `v-row`.

<example name="ExampleGridNowrap"></example>

#### Example - auto width columns {#ExampleGridAuto}

Adding `grow` class to `v-cols` will generate columns that fit available space in the row.

<example name="ExampleGridAuto"></example>

To wrap auto width columns to a new line use `v-col-break` component.

<example name="ExampleGridAutoBreak"></example>

Auto width columns can be used with columns that have explicit width. Auto width columns will automaticaly resize to fit into available space.

<example name="ExampleGridAutoMix"></example>

#### Example - variable width columns {#ExampleGridVariable}

Use `basis-auto` class to make columns that have size based on the natural width of their content.

<example name="ExampleGridVariable"></example>

#### Example - responsive column width {#ExampleGridResponsive}

To create responsive grid simply add responsive modifiers (`md:`, `lg:` etc) to `basis-*` or `grow` classes.

<example name="ExampleGridResponsive"></example>

#### Example - columns break {#ExampleGridBreak}

To break columns to a new line use the `v-col-break` component.

<example name="ExampleGridBreak"></example>

To break columns only at certain breakpoints use `hidden` and `block` classes with the responsive modifiers. In the example below columns only break at small screens.

<example name="ExampleGridBreakResponsive"></example>

#### Example - row horizontal alignment {#ExampleGridAlignHorizontal}

To align columns along horizontal axis use `justify-*` classes in the row.

<example name="ExampleGridAlignHorizontal"></example>

#### Example - row vertical alignment {#ExampleGridAlignVertical}

To align columns along vertical axis use `items-*` classes in the row. You can also align columns seperately with `self-*` classes.

<example name="ExampleGridAlignVertical"></example>

#### Example - gutters {#ExampleGridGutter}

By default columns are not separated by gutter. You can add it using padding classes and then offset it with equal negative margin classes in the row. In the example below `[&>*]:` modifier is used to add equal padding to entire row but you can also set it seperately for each column. For more info on custom modifiers see [tailwind documentation](https://tailwindcss.com/docs/hover-focus-and-other-states#using-arbitrary-variants)

<v-alert icon="info" mod-alert="variant:info">
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

<example name="ExampleGridGutter"></example>

Gutters can also be made responsive. In the following example gutters get narrower on lower resolutions and are disabled on small screens.

<example name="ExampleGridGutterResponsive"></example>

#### Example - columns position with margin classes {#ExampleGridMargin}

You can shift or center columns with `ml-auto` , `mr-auto` or `mx-auto` margin utility classes.

<example name="ExampleGridMargin"></example>

#### Example - nested layouts {#ExampleGridNested}

Grids can also be nested by placing `v-rows` inside `v-cols` .

<example name="ExampleGridNested"></example>

#### Example - column order {#ExampleGridOrder}

`order-*` classes can be used to change order of columns.

<example name="ExampleGridOrder"></example>
