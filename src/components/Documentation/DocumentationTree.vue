<template>
  <h3>Tree</h3>
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
    <table-reference-basic :items="events" reference="event"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots" reference="slot"></table-reference-basic>

    <h6>Functions</h6>
    <p></p>
    <table-reference-basic :items="functions" reference="function"></table-reference-basic>
  </section>

  <section>
    <h4>Example - simple tree</h4>
    <div class="example">
      <example-tree-simple></example-tree-simple>
    </div>
    <v-code :code="ExampleTreeSimpleCode" template language="html"></v-code>
    <v-code :code="ExampleTreeSimpleCode" script language="js"></v-code>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-tree></example-tree>
    </div>
    <v-code :code="ExampleTreeCode" template language="html"></v-code>
    <v-code :code="ExampleTreeCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleTree from "./examples/ExampleTree.vue"
import ExampleTreeSimple from "./examples/ExampleTreeSimple.vue"
import ExampleTreeCode from "./examples/ExampleTree.vue?raw"
import ExampleTreeSimpleCode from "./examples/ExampleTreeSimple.vue?raw"
import { styleProps } from "./shared-props"

export default {
  components: {
    ExampleTree,
    ExampleTreeSimple,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "items",
        type: ["Array"],
        default: "[]",
        description: "Array of tree items",
      },
      {
        prop: "item-name",
        type: ["String"],
        default: "name",
        description: "Name of the property that hold name of item",
      },
      {
        prop: "item-children",
        type: ["String"],
        default: "children",
        description: "Name of the property that hold name of array of children",
      },
      {
        prop: "item-icon",
        type: ["String"],
        default: "icon",
        description: "Name of the property that hold name of item's icon. Valid name is the same as for v-icon name prop",
      },
      {
        prop: "item-key",
        type: ["String"],
        default: "id",
        description: "Name of the <span class='font-bold'>required</span> property that hold unique value for every item.",
      },
      {
        prop: "item-disabled",
        type: ["String"],
        default: "disabled",
        description: "Name of the property for disabled items. Disabling folders also disable all of their children items",
      },
      {
        prop: "filter",
        type: ["String"],
        default: "empty string",
        description: "String used to filter items",
      },
      {
        prop: "auto-open-root",
        type: ["Boolean"],
        default: "false",
        description: "If true mounts tree with root node opened",
      },
      {
        prop: "auto-open-all",
        type: ["Boolean"],
        default: "false",
        description: "If true mounts tree with all nodes opened",
      },
      {
        prop: "open-on-click",
        type: ["Boolean"],
        default: "true",
        description: "If true clicking on labels opens folders. Clicking indicators always opens folders",
      },
      {
        prop: "allow-select-disabled",
        type: ["Boolean"],
        default: "false",
        description: "If true disabled items can be selected",
      },
      {
        prop: "allow-open-disabled",
        type: ["Boolean"],
        default: "true",
        description: "If true disabled items can be opened",
      },
      {
        prop: "select-return-keys",
        type: ["Boolean"],
        default: "false",
        description: "If true <code class='code-word'>input:selected</code> return array of item keys. If false (default) this event returns array of item objects",
      },
      {
        prop: "independent-select",
        type: ["Boolean"],
        default: "false",
        description: "If true folders and items can be selected independently. By default selecting folders selects all children items and selecting every children selects parent folder",
      },
      {
        prop: "show-indicators",
        type: ["Boolean"],
        default: "true",
        description: "Whether to display open indicators",
      },
      {
        prop: "show-icons",
        type: ["Boolean"],
        default: "true",
        description: "Whether to display icons",
      },
      {
        prop: "show-checkboxes",
        type: ["Boolean"],
        default: "false",
        description: "Whether to display checkboxes",
      },
      {
        prop: "placeholder-folder-icon",
        type: ["String", "Object", "Array"],
        default: "undefined",
        description: "Default icon for folders if no icon is provided in items prop. If value is <code class='code-text'>array</code> then icons are respectively for closed and opened folders",
      },
      {
        prop: "placeholder-item-icon",
        type: ["String", "Object"],
        default: "undefined",
        description: "Default icon for items if no icon is provided in items prop",
      },
      {
        prop: "chevron-attrs",
        type: ["Object"],
        default: "{}",
        description: "Props of <code class='code-text'>v-chevron</code> (open indicator) component. See documentation for valid values",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade-m",
        description: "Sets animation effect when opening or closing folders. Valid values are: 'fade-f', 'fade-m', 'fade-s', 'fade-slide-f', 'fade-slide-m' and 'fade-slide-s'. Empty string disables animations.",
      },
      ...styleProps("tree"),
    ]);

    let styles = ref([
      {
        prop: "style-folder",
        description: "Folder element",
      },
      {
        prop: "style-item",
        description: "Item element",
      },
      {
        prop: "style-icon",
        description: "Icon element",
      },
    ]);

    let events = ref([
      {
        event: "input:click",
        description: "Fired when item is clicked (folders and items). Passes item as argument. Note that disabled items also trigger this event but those can be easly dismissed by checking <code class='code-text'>disabled</code> property",
      },
      {
        event: "input:selected",
        description: "Fired when item is selected. Passes array of selected items",
      },
    ]);

    let slots = ref([
      {
        slot: "item",
        description:
          "Slot for complete customization of appearance of items. Other slots are unavailable when using this slot",
      },
      {
        slot: "icon",
        description:
          "Slot for items icon",
      },
      {
        slot: "name",
        description:
          "Slot for items name",
      },
      {
        slot: "item-prepend",
        description:
          "Slot for content that prepends item name",
      },
      {
        slot: "item-append",
        description:
          "Slot for content that is appended to item name",
      },
    ]);

    let functions = ref([
      {
        function: "openAllLevel(level: Number)",
        description:
          "Opens all nodes on level (0 for root, any high number to open all nodes)",
      },
      {
        function: "closeAll()",
        description:
          "Closes all nodes",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
      functions,
      ExampleTreeCode,
      ExampleTreeSimpleCode,
    };
  },
};
</script>

<style scoped>
</style>
