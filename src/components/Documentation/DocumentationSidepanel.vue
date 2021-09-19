<template>
  <h3>Sidepanel</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Events</h6>
    <p></p>
    <table-reference-basic :items="events"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-sidepanel></example-sidepanel>
    </div>
    <pre>
      <code class="language-html">
&lt;v-sidepanel
  v-model=&quot;example.isOpen&quot;
  :closeButton=&quot;example.closeButton&quot;
  :sidebar-left=&quot;example.sidebarLeft&quot;
  :width=&quot;example.width&quot;
  :no-header=&quot;example.noHeader&quot;
&gt;
  &lt;template #header&gt;
    &lt;span class=&quot;text-xl font-bold&quot;&gt;Sidepanel&lt;/span&gt;
  &lt;/template&gt;
  &lt;div class=&quot;p-5&quot;&gt;
    Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text ever
    since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only
    five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s with
    the release of Letraset sheets containing Lorem Ipsum passages, and
    more recently with desktop publishing software like Aldus PageMaker
    including versions of Lorem Ipsum.
  &lt;/div&gt;
&lt;/v-sidepanel&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleSidepanel from "./examples/ExampleSidepanel.vue"

export default {
  components: {
    ExampleSidepanel,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Boolean"],
        default: "false",
        description:
          "Controls the state of sidepanel. If true, sidepanel is open",
      },
      {
        prop: "close-button",
        type: ["Boolean"],
        default: "true",
        description: "If true shows a close button in top right corner",
      },
      {
        prop: "sidebar-left",
        type: ["Boolean"],
        default: "false",
        description: "If true displays sidepanel on the left",
      },
      {
        prop: "width",
        type: ["String"],
        default: "320px",
        description: "Width of sidepanel",
      },
      {
        prop: "no-header",
        type: ["Boolean"],
        default: "false",
        description: "When true the header slot content and close button is not rendered",
      },
      {
        prop: "name",
        type: ["String"],
        default: "sidepanel",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-sidepanel",
        description: "Main sidepanel element",
      },
    ]);

    let events = ref([
      {
        prop: "update:modelValue",
        description: "Update v-model",
      },
    ]);

    let slots = ref([
      {
        prop: "header",
        description: "Slot for header content",
      },
      {
        prop: "default",
        description: "Slot for sidepanel content",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
