<template>
  <h3>Popover</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-popover></example-popover>
    </div>
    <pre>
      <code class="language-html">
&lt;v-popover
  :placement=&quot;example.placement&quot;
  :trigger=&quot;example.trigger&quot;
  :no-header=&quot;example.noHeader&quot;
  :title=&quot;example.title&quot;
  :transition=&quot;example.transition&quot;
  :click-outside-close=&quot;example.clickOutsideClose&quot;
  @update:modelValue=&quot;
    example.events.unshift({ ev: 'update:modelValue', data: $event })
  &quot;
&gt;
  &lt;template #activator&gt;
    &lt;v-button&gt;Show popover&lt;/v-button&gt;
  &lt;/template&gt;
  This is popover.
&lt;/v-popover&gt;

&lt;v-popover
  :placement=&quot;example.placement&quot;
  :trigger=&quot;example.trigger&quot;
  :no-header=&quot;example.noHeader&quot;
  title=&quot;Login&quot;
  :transition=&quot;example.transition&quot;
  :click-outside-close=&quot;example.clickOutsideClose&quot;
  @update:modelValue=&quot;
    example.events.unshift({ ev: 'update:modelValue', data: $event })
  &quot;
&gt;
  &lt;template #activator&gt;
    &lt;v-button&gt;Show popover&lt;/v-button&gt;
  &lt;/template&gt;
  &lt;div class=&quot;grid grid-cols-3 gap-2 my-2&quot;&gt;
    &lt;label for=&quot;&quot;&gt;Login&lt;/label&gt;
    &lt;v-input type=&quot;text&quot; class=&quot;col-span-2&quot;&gt;&lt;/v-input&gt;
    &lt;label for=&quot;&quot;&gt;Password&lt;/label&gt;
    &lt;v-input type=&quot;text&quot; class=&quot;col-span-2&quot;&gt;&lt;/v-input&gt;
  &lt;/div&gt;
&lt;/v-popover&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref } from "vue";
import ExamplePopover from "./examples/ExamplePopover.vue"

export default {
  components: {
    ExamplePopover,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "placement",
        type: ["String"],
        default: "auto",
        description:
          "Initial placement of popover. Valid values are same as for <a href='https://popper.js.org/docs/v2/constructors/' class='link'>Popperjs</a>",
      },
      {
        prop: "trigger",
        type: ["String"],
        default: "click",
        description:
          "Type of trigger that show or hides popover. Valid triggers are 'click', 'hover' and 'focus'",
      },
      {
        prop: "no-header",
        type: ["Boolean"],
        default: "false",
        description: "Disabled popover header",
      },
      {
        prop: "title",
        type: ["String"],
        default: "undefined",
        description: "Title displayed in popover header",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade",
        description: "Animation when showing or hiding popover",
      },
      {
        prop: "click-outside-close",
        type: ["Boolean"],
        default: "false",
        description: "If true clicking outside of popover closes it",
      },
      {
        prop: "target-id",
        type: ["String"],
        default: "undefined",
        description: "Id of element that controls popover",
      },
      {
        prop: "name",
        type: ["String"],
        default: "popover",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-popover",
        description: "Main popover element",
      },
      {
        prop: "style-content",
        description: "Content of popover",
      },
    ]);

    let slots = ref([
      {
        prop: "activator",
        description: "Slot for element that activates popover",
      },
      {
        prop: "default",
        description: "Slot for popover content",
      },
    ]);

    return {
      reference,
      styles,
      slots,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
