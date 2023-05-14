<template>
  <h3>Grid</h3>
  <links-github-header component="vCard" />

  <section>
    <h4 id="GridUsage">Usage</h4>
    <p>
      Grids components can be used to make flexbox layouts. Those components are
      very simple with no props or default classes (just single divs). Combine
      them with Tailwind responsive classes to create grids similar to
      Bootstrap and others.
    </p>
    <p>Grid components:</p>
    <ul class="ml-4">
      <li><code class="code-text">v-container</code> - responsive container that sets <code class="code-text">max-width</code> for current breakpoint.</li>
      <li><code class="code-text">v-fluid-container</code> - container that fills available width.</li>
      <li><code class="code-text">v-row</code> - row that contains columns. Use <code class="code-text">justify-*</code> and <code class="code-text">items-*</code> classes to align content in columns.</li>
      <li><code class="code-text">v-col</code> - single column. Use <code class="code-text">basis-*</code> or <code class="code-text">w-*</code> classes to set width for every column.</li>
      <li><code class="code-text">v-auto-col</code> - column that fills available width in the row.</li>
    </ul>
  </section>

  <section>
    <h4 id="ExampleGridSimple">Example - simple</h4>
    <p>
      Basic 12 columns layout with percentage widths similar to Bootstrap.
    </p>
    <div class="example">
      <example name="ExampleGridSimple"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridWrap">Example - column wrapping</h4>
    <p>
      By default columns that overflow row are wrapped to the next line.
    </p>
    <div class="example">
      <example name="ExampleGridWrap"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridAuto">Example - auto width columns</h4>
    <p>
      <code class="code-text">v-auto-col</code>
      component will generate columns that fit available space in the row.
    </p>
    <div class="example">
      <example name="ExampleGridAuto"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridAlignHorizontal">Example - row horizontal alignment</h4>
    <div class="example">
      <example name="ExampleGridAlignHorizontal"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridAlignVertical">Example - row vertical alignment</h4>
    <div class="example">
      <example name="ExampleGridAlignVertical"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleGridGutter">Example - gutters</h4>
    <p>
      You can add gutters to rows and columns with padding and negative margin classes.
    </p>
    <div class="example">
      <example name="ExampleGridGutter"></example>
    </div>
  </section>
</template>
