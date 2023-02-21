<template>
  <h3>Dropdown</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <h6>Events</h6>
    <table-reference-basic :items="events" reference="event" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />

    <h6>Components</h6>
    <table-reference-basic :items="components" reference="component" />

    <h6>Functions</h6>
    <table-reference-basic :items="functions" reference="function" />
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
        <p>
          To control dropdown visibility you can use <code class="code-text">reference</code> slot (recommended method) or <code class="code-text">v-trigger</code> component. 
        </p>
        <p>
          To control it programatically you can add optional <code class="code-text">v-model</code> or call exposed <code class="code-text">show()</code> and <code class="code-text">hide()</code> functions.
        </p>
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
      <example name="ExampleDropdownSimple" :script="false"></example>
    </div>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleDropdown"></example>
    </div>
  </section>

  <section id="ExampleDropdownTrigger" class="scroll-mt-20">
    <h4>Example - open by id</h4>
    <p>
    You can also control state of the dropdown menu by using <code class="code-text">v-trigger</code> component. The <code class="code-text">for</code> prop of the <code class="code-text">v-trigger</code> should be the same as <code class="code-text">id</code> of the dropdown. The advantage of this method is that <code class="code-text">v-triggers</code> can be put anywhere in application. Read more about v-trigger here.
    </p>
    <div class="example">
      <example name="ExampleDropdownTrigger" :script="false"></example>
    </div>
  </section>

  <section>
    <h4>Example - alternative styles</h4>
    <p>
      Dropdown comes with some default alternative styles.
    </p>
    <div class="example">
      <example name="ExampleDropdownStyles" :script="false"></example>
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
import { ref } from "vue";
import { sharedProps, popperProps, styleProps } from "./shared-props";

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "modelValue",
        type: ["Boolean"],
        default: "false",
        description:
          "Set it to `true`/`false` to programatically show or hide dropdown content. Model is optional",
      },
      {
        prop: "trigger",
        type: ["String"],
        default: "click",
        description:
          "How to trigger dropdown. Valid triggers are 'click', 'focus' and 'hover'",
      },
      {
        prop: "auto-close-menu",
        type: ["Boolean"],
        default: "false",
        description:
          "If `true` clicking any dropdown menu item automatically closes dropdown",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade-m",
        description:
          "Sets animation effect when showing or hiding dropdown. Valid values are: 'fade' or `empty string` to disable animations. Animation speed can be set in `--dropdown-transition-duration` css variable.",
      },
      ...popperProps,
      ...styleProps(),
      ...sharedProps(),
    ]);

    let styles = ref([
      {
        prop: "style-menu-item",
        description: "Style of menu item",
      },
      {
        prop: "style-menu-item-header",
        description: "Style of menu header",
      },
    ]);

    let events = ref([
      {
        event: "state:opened",
        description: "Emitted after dropdown is opened",
      },
      {
        event: "state:closed",
        description: "Emitted after dropdown is closed",
      },
    ]);

    let slots = ref([
      {
        slot: "reference",
        description:
          "Slot for element that activates dropdown. Dropdown is positioned relative to element that has `ref` set to `reference`. Slot props: `reference`, `onTrigger` and `isOpen`",
      },
      {
        slot: "default",
        description:
          "Slot for dropdown content. Slot props: `hide()`",
      },
    ]);

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

    let functions = ref([
      {
        function: "showContextDropdown($event, contextData: Object)",
        description:
          "Shows context menu. Context data is available in slot props of `default` slot. Only available on v-dropdown-context",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
      functions,
      components,
    };
  },
};
</script>

<style scoped></style>
