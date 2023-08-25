<template>
  <h3>Notify</h3>
  <links-github-header component="vInput" />

  <section>
    <h4 id="InputReference">Reference - notify container</h4>
    <table-reference :items="referenceContainer.props" />

    <h4 id="InputReference">Reference - notify</h4>
    <table-reference :items="reference.props" />

    <h6 id="InputEvents">Events</h6>
    <table-reference-basic :items="reference.events" reference="event" />

    <h6 id="InputSlots">Slots</h6>
    <table-reference-basic
      :items="reference.slots"
      reference="slot"
    />
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="DropdownNotes">Notes</h4>
    <ul class="flex flex-col gap-y-7 mt-6">
      <li>
        <header class="font-semibold text-lg dark:text-text-200 mb-2">
          Usage
        </header>
        In order to start using first place <code class="code-text">v-notify-component</code> in one of the top level components (for example in <code class="code-text">App.vue</code>). Setting this component early is important to make sure it is available before adding any notifications. With the component in place you can then import <code class="code-text">useNotify</code> function anywhere in your application and start displaying notifications.
      </li>
      <li>
        <header class="font-semibold text-lg dark:text-text-200 mb-2">
          Notify container position
        </header>
        By default notify container is positioned as <code class="code-text">fixed</code> element. In order to set it up properly you should add few more tailwind classes to it:
        <ul class="list-disc list-inside my-2">
          <li>
            <code class="code-text">top-*</code>, <code class="code-text">bottom-*</code>, <code class="code-text">left-*</code> and <code class="code-text">right-*</code> to place it in desired position,
          </li>
          <li>
            <code class="code-text">w-* </code>class to set width of notify windows,
          </li>
          <li>
            <code class="code-text">space-y-*</code> to create gaps between notifications,
          </li>
        </ul>
        For example <code class="code-text">bottom-4 right-10 w-[350px] space-y-4</code> will make notifications appear in the bottom right corner of the screen. Notification will be 350px wide and seperated with 1rem of space.
      </li>
      <li>
        <header class="font-semibold text-lg dark:text-text-200 mb-2">
          Adding new notifications
        </header>
        To add new notifications import and call <code class="code-text">useNotify</code> function anywhere in your application. You can then use returned object and its <code class="code-text">push</code> function to add new notifications. <code class="code-text">Push</code> function can take single <code class="code-text">string</code> argument that will add very basic notifiation with default settings. For more control and customization you can use object as argument that will allow additional options for example adding header or icon, setting auto dismiss delay etc.
      </li>
      <li>
        <header class="font-semibold text-lg dark:text-text-200 mb-2">
          Hiding notifications
        </header>
        By default notifications will auto close after short delay (defined in <code class="code-text">auto-hide-delay</code> prop of the <code class="code-text">v-notify-container</code>). That behavior can be disabled globally by enabling <code class="code-text">static</code> prop of the <code class="code-text">v-notify-container</code>. If only selected notifications should be manually dismissed use <code class="code-text">static</code> property of the argument when calling <code class="code-text">push</code> function. By default hovering over <code class="code-text">v-notify-container</code> pauses all timers and restarts them after pointer leaves element.
      </li>
      <li>
        <header class="font-semibold text-lg dark:text-text-200 mb-2">
          Teleport
        </header>
        Since <code class="code-text">v-notify-container</code> is positioned as <code class="code-text">fixed</code> element it is recommended to teleport it to the <code class="code-text">body</code> element.
      </li>
    </ul>
  </section>

  <v-divider></v-divider>

  <section>
    <h4 id="ExampleNotify">Example - notify</h4>
    <div class="example">
      <example name="ExampleNotify"></example>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentationContainer from "../components-documentation/vNotifyContainer.json"
import componentDocumentation from "../components-documentation/vNotify.json"

export default {
  setup(props) {
    let reference = reactive(componentDocumentation)
    let referenceContainer = reactive(componentDocumentationContainer)
    
    return {
      reference,
      referenceContainer,
    };
  },
};
</script>

<style scoped></style>

