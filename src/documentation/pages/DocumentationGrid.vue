<template>
  <h3>Grid</h3>
  <links-github-header component="Grid" />

  <section>
    <h4 id="GridUsage">Usage</h4>
    <p>
      Grids components can be used to make flexbox layouts. Those components are
      very simple with no props and only few necessary classes by default. Combine them with Tailwind
      responsive utilities to create grids similar to Bootstrap and others.
    </p>
  </section>

  <section>
    <h4 id="GridComponents">Grid components</h4>
    <table-reference-basic
      :items="components"
      reference="component"
    ></table-reference-basic>
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="ExampleGridSimple">Example - simple</h4>
    <p>Basic 12 columns layout with percentage widths similar to Bootstrap.</p>
    <div class="example">
      <example name="ExampleGridSimple"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridWrap">Example - column wrapping</h4>
    <p>By default columns that overflow row are wrapped to the next line.</p>
    <div class="example">
      <example name="ExampleGridWrap"></example>
    </div>
    <p>To disable default column wrapping add <code class="code-text">flex-nowrap</code> classto the <code class="code-text">v-row</code>.</p>
    <div class="example">
      <example name="ExampleGridNowrap"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridAuto">Example - auto width columns</h4>
    <p>
      Adding
      <code class="code-text">grow</code>
      class to
      <code class="code-text">v-cols</code>
      will generate columns that fit available space in the row.
    </p>
    <div class="example">
      <example name="ExampleGridAuto"></example>
    </div>
    <p>
      To wrap auto width columns to a new line use
      <code class="code-text">v-col-break</code>
      component.
    </p>
    <div class="example">
      <example name="ExampleGridAutoBreak"></example>
    </div>
    <p>
      Auto width columns can be used with 
      columns that have explicit width. Auto width columns will automaticaly resize to
      fit into available space.
    </p>
    <div class="example">
      <example name="ExampleGridAutoMix"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridVariable">Example - variable width columns</h4>
    <p>
      Use
      <code class="code-text">basis-auto</code>
      class to make columns that have size based on the natural width of their
      content
    </p>
    <div class="example">
      <example name="ExampleGridVariable"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridResponsive">Example - responsive column width</h4>
    <p>
      To create responsive grid simply add responsive modifiers (
      <code class="code-text">md:</code>
      ,
      <code class="code-text">lg:</code>
      etc) to
      <code class="code-text">basis-*</code>
      or
      <code class="code-text">w-*</code>
      classes.
    </p>
    <div class="example">
      <example name="ExampleGridResponsive"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridBreak">Example - columns break</h4>
    <p>
      To break columns to a new line use the
      <code class="code-text">v-col-break</code>
      component.
    </p>
    <div class="example">
      <example name="ExampleGridBreak"></example>
    </div>
    <p>
      To break columns only at certain breakpoints use
      <code class="code-text">hidden</code>
      and
      <code class="code-text">block</code>
      classes with the responsive modifiers. In the example below columns only
      break at small screens.
    </p>
    <div class="example">
      <example name="ExampleGridBreakResponsive"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridAlignHorizontal">Example - row horizontal alignment</h4>
    <p>
      To align columns along horizontal axis use
      <code class="code-text">justify-*</code>
      classes in the row.
    </p>
    <div class="example">
      <example name="ExampleGridAlignHorizontal"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridAlignVertical">Example - row vertical alignment</h4>
    <p>
      To align columns along vertical axis use
      <code class="code-text">items-*</code>
      classes in the row. You can also align columns seperately with
      <code class="code-text">self-*</code>
      classes.
    </p>
    <div class="example">
      <example name="ExampleGridAlignVertical"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridGutter">Example - gutters</h4>
    <p>
      By default columns are not separated by gutter. You can add it using
      padding classes and then offset it with equal negative margin classes in the row.
      In the example below
      <code class="code-text">[&>*]:</code>
      modifier is used to add equal padding to entire row but you can also set
      it seperately for each column. For more info on custom modifiers see <a href="https://tailwindcss.com/docs/hover-focus-and-other-states#using-arbitrary-variants" class="link">tailwind documentation</a>.
    </p>
    <p>
      <v-alert
        icon="info"
        style-alert="info"
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
        <code class="code-text">v-rows</code>
        .
      </v-alert>
    </p>
    <div class="example">
      <example name="ExampleGridGutter"></example>
    </div>
    <p>
      Gutters can also be made responsive. In the following example gutters get
      narrower on lower resolutions and are disabled on small screens.
    </p>
    <div class="example">
      <example name="ExampleGridGutterResponsive"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridMargin">
      Example - columns position with margin classes
    </h4>
    <p>
      You can shift or center columns with
      <code class="code-text">ml-auto</code>
      ,
      <code class="code-text">mr-auto</code>
      or
      <code class="code-text">mx-auto</code>
      margin utility classes.
    </p>
    <div class="example">
      <example name="ExampleGridMargin"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridNested">Example - nested layouts</h4>
    <p>
      Grids can also be nested by placing
      <code class="code-text">v-rows</code>
      inside
      <code class="code-text">v-cols</code>
      .
    </p>
    <div class="example">
      <example name="ExampleGridNested"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridOrder">Example - column order</h4>
    <p>
      <code class="code-text">order-*</code>
      classes can be used to change order of columns.
    </p>
    <div class="example">
      <example name="ExampleGridOrder"></example>
    </div>
  </section>
</template>

<script setup>
let components = [
  {
    component: "v-container",
    description:
      "Responsive container that sets `max-width` for current breakpoint. It is centered by default.",
  },
  {
    component: "v-fluid-container",
    description: "Variant of container that fills available width.",
  },
  {
    component: "v-row",
    description:
      "Wrapper for columns. v-rows should be placed directly inside v-container, v-cols and may contain only v-cols.",
  },
  {
    component: "v-col",
    description:
      "Single column for the content. It can only be placed inside v-rows.",
  },
  {
    component: "v-col-break",
    description: "Allows breaking of the v-auto-cols to a new line.",
  },
];
</script>

<style>
.column-content {
  @apply rounded
    border
    border-dark-500
    bg-secondary-200
    p-2
    dark:border-dark-400
    dark:bg-dark-700;
}
.nested-column-content {
  @apply rounded
    border-2
    border-red-500
    bg-secondary-200
    p-2
    dark:border-red-400
    dark:bg-dark-700;
}
</style>
