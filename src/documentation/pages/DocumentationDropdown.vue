<template>
  <h3>Dropdown</h3>
  <links-github-header component="vDropdown" />

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />

    <h6>Events</h6>
    <table-reference-basic :items="reference.events" reference="event" />

    <h6>Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />

    <h6>Components</h6>
    <table-reference-basic :items="components" reference="component">
      <template #description-v-dropdown-menu-item>
        <props-list :items="referenceMenuItem.props" reference="prop"></props-list>
      </template>
    </table-reference-basic>

    <h6>Functions</h6>
    <table-reference-basic :items="reference.functions" reference="function" />
  </section>

  <v-divider></v-divider>

  <section>
    <h4>Notes</h4>
    <ul class="flex flex-col gap-y-7 mt-6">
      <li>
        <header class="font-semibold text-lg mb-2">
          <span>#</span>
          Dropdown activation
        </header>
          To control dropdown visibility you can use <code class="code-text">reference</code> slot (recommended method) or <code class="code-text">v-trigger</code> component. 
          To control it programatically you can add optional <code class="code-text">v-model</code> or call exposed <code class="code-text">show()</code> and <code class="code-text">hide()</code> functions.
      </li>
      <li>
        <header class="font-semibold text-lg mb-2">
          <span>#</span>
          Menu content 
        </header>
        Dropdown menu allows for any type of content inside. To make it flexible it does not have own default container, you can use <code class="code-text">v-card</code> with variants or utility classes to organize content.
      </li>
      <li>
        <header class="font-semibold text-lg mb-2">
          <span>#</span>
          Teleport
        </header>
        Open dropdown is by default appended to the body element.
      </li>
      <li>
        <header class="font-semibold text-lg mb-2">
          <span>#</span>
          Context menus
        </header>
        You can set up context menu with <code class="code-text">v-dropdown-context</code>. See example below. See <a href="#ExampleDropdownContext" class="link">example</a>.
      </li>
    </ul>
  </section>

  <v-divider></v-divider>

  <section>
    <h4>Example - simple dropdown</h4>
    <div class="example">
      <example name="ExampleDropdownSimple"></example>
    </div>
  </section>

  <!-- <section> -->
  <!--   <h4>Example</h4> -->
  <!--   <div class="example"> -->
  <!--     <example name="ExampleDropdown"></example> -->
  <!--   </div> -->
  <!-- </section> -->

  <section id="ExampleDropdownTrigger" class="scroll-mt-20">
    <h4>Example - open by id</h4>
    <p>
    You can also control state of the dropdown menu by using <code class="code-text">v-trigger</code> component. The <code class="code-text">for</code> prop of the <code class="code-text">v-trigger</code> should be the same as <code class="code-text">id</code> of the dropdown. The advantage of this method is that <code class="code-text">v-triggers</code> can be put anywhere in application. Read more about v-trigger here.
    </p>
    <div class="example">
      <example name="ExampleDropdownTrigger"></example>
    </div>
  </section>

  <section>
    <h4>Example - alternative styles</h4>
    <p>
      Dropdown comes with some default alternative styles.
    </p>
    <div class="example">
      <example name="ExampleDropdownStyles"></example>
    </div>
  </section>

  <section>
    <h4>Example - custom content</h4>
    <div class="example">
      <example name="ExampleDropdownCustomContent"></example>
    </div>
  </section>

  <section id="ExampleDropdownContext" class="scroll-mt-20">
    <h4>Example - context dropdown</h4>
    <p>
      To make context menu use <code class="code-text">v-dropdown-context</code>. This component exposes
      <code class="code-text">
        showContextDropdown($event, { contextData })
      </code>
      function that controls visibility state of menu and sets context data. First argument, mouse <code class="code-text">event</code>, allows computing position of menu. Second argument defines data that is provided in <code class="code-text">default</code> slot of dropdown component.
    </p>
    <div class="example">
      <example name="ExampleDropdownContext"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "../components-documentation/vDropdown.json"
import menuItemDocumentation from "../components-documentation/vDropdownMenuItem.json"
import menuHeaderDocumentation from "../components-documentation/vDropdownMenuItem.json"

export default {
  setup(props) {
    let reference = reactive(componentDocumentation)

    let components = ref([
      {
        component: "v-dropdown-menu-item",
        description: "Single menu item",
      },
      {
        component: "v-dropdown-header",
        description: "Menu header",
      },
      {
        component: "v-button-chevron",
        description:
          "Optional version of v-button that has reactive indicator build in. It uses the same props as normal v-button.",
      },
    ]);

    let referenceMenuItem = reactive(menuItemDocumentation)

    return {
      reference,
      components,
      referenceMenuItem,
    };
  },
};
</script>

<style scoped></style>
