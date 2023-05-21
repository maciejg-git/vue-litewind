<template>
  <h3>Dropdown</h3>
  <links-github-header component="vDropdown" />

  <section>
    <h4 id="DropdownReference">Reference</h4>
    <table-reference :items="reference.props" />

    <h6 id="DropdownEvents">Events</h6>
    <table-reference-basic :items="reference.events" reference="event" />

    <h6 id="DropdownSlots">Slots</h6>
    <table-reference-basic :items="reference.slots" reference="slot" />

    <h6 id="DropdownComponents">Components</h6>
    <p>
      <a
        href="/documentation/dropdown-menu-item"
        class="link"
      >
        v-dropdown-menu-item
      </a>
    </p>

    <h6 id="DropdownFunctions">Functions</h6>
    <table-reference-basic :items="reference.functions" reference="function" />
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="DropdownNotes">Notes</h4>
    <ul class="flex flex-col gap-y-7 mt-6">
      <li>
        <header class="font-semibold text-lg dark:text-text-200 mb-2">
          Dropdown activation
        </header>
          To control dropdown visibility you can use <code class="code-text">reference</code> slot (recommended method) or <code class="code-text">v-trigger</code> component. 
          To control it programatically you can add optional <code class="code-text">v-model</code> or call exposed <code class="code-text">show()</code> and <code class="code-text">hide()</code> functions.
      </li>
      <li>
        <header class="font-semibold text-lg dark:text-text-200 mb-2">
          Menu content 
        </header>
        Dropdown menu allows for any type of content inside. To make it flexible it does not have own default container, you can use <code class="code-text">v-card</code> with variants or utility classes to organize content.
      </li>
      <li>
        <header class="font-semibold text-lg dark:text-text-200 mb-2">
          Teleport
        </header>
        Open dropdown is by default appended to the body element.
      </li>
      <li>
        <header class="font-semibold text-lg dark:text-text-200 mb-2">
          Context menus
        </header>
        You can set up context menu with <code class="code-text">v-dropdown-context</code>. See example below. See <a href="#ExampleDropdownContext" class="link">example</a>.
      </li>
    </ul>
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="ExampleDropdownSimple">Example - simple dropdown</h4>
    <div class="example">
      <example name="ExampleDropdownSimple"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleDropdown">Example - props</h4>
    <div class="example">
      <example name="ExampleDropdown"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleDropdownStyles">Example - alternative styles</h4>
    <p>
      Dropdown comes with some default alternative styles.
    </p>
    <div class="example">
      <example name="ExampleDropdownStyles"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleDropdownCustomContent">Example - custom content</h4>
    <div class="example">
      <example name="ExampleDropdownCustomContent"></example>
    </div>
  </section>

  <section id="ExampleDropdownTrigger">
    <h4 id="ExampleDropdownTrigger" >Example - open by id</h4>
    <p>
    You can also control state of the dropdown menu by using <code class="code-text">v-trigger</code> component. The <code class="code-text">for</code> prop of the <code class="code-text">v-trigger</code> should be the same as <code class="code-text">id</code> of the dropdown. The advantage of this method is that <code class="code-text">v-triggers</code> can be put anywhere in application. Read more about v-trigger here.
    </p>
    <div class="example">
      <example name="ExampleDropdownTrigger"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleDropdownContext">Example - context dropdown</h4>
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

export default {
  setup(props) {
    let reference = reactive(componentDocumentation)

    return {
      reference,
    };
  },
};
</script>

<style scoped></style>
