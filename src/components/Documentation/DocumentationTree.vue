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
    <table-reference-basic :items="events"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots"></table-reference-basic>
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
import ExampleTreeCode from "./examples/ExampleTree.vue?raw"
import { popperProps, styleProps, formProps } from "./shared-props"

export default {
  components: {
    ExampleTree,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "items",
        type: ["Object"],
        default: "{}",
        description: "Object of items to make tree from",
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
        default: "children",
        description: "Name of the property that hold name of item's icon. Valid name is the same as for v-icon name prop",
      },
      {
        prop: "open-on-click",
        type: ["Boolean"],
        default: "true",
        description: "If true folders are automatically opened when clicked",
      },
      {
        prop: "indicators",
        type: ["Boolean"],
        default: "true",
        description: "Whether to display open indicators",
      },
      {
        prop: "icons",
        type: ["Boolean"],
        default: "true",
        description: "Whether to display icons",
      },
      {
        prop: "checkboxes",
        type: ["Boolean"],
        default: "true",
        description: "Whether to display checkboxes",
      },
      {
        prop: "placeholder-folder-icon",
        type: ["String", "Object"],
        default: "undefined",
        description: "Folder icon to display if no icon is provided",
      },
      {
        prop: "placeholder-item-icon",
        type: ["String", "Object"],
        default: "undefined",
        description: "Item icon to display if no icon is provided",
      },
      {
        prop: "chevron-attrs",
        type: ["Object"],
        default: "{}",
        description: "Object of attributes that are passed to v-chevron component",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade-m",
        description: "Defines an animation when opening or closing folders",
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
    ]);

    let events = ref([
      {
        prop: "input:item",
        description: "Fired when item is clicked (folders and items). Passes item as argument. Note that disabled items also trigger this event but those can be easly dismissed by checking <code class='code-text'>disabled</code> property",
      },
      {
        prop: "input:opened-item",
        description: "Fired after opening folder",
      },
      {
        prop: "input:closed-item",
        description: "Fired after closing folder",
      },
    ]);

    let slots = ref([
      {
        prop: "item",
        description:
          "Slot for complete customization of appearance of items. Note that you will need to provide own toggle indicators, icons, checkboxes, native event listeners etc. Other slots are unavailable when using this slot",
      },
      {
        prop: "item-name",
        description:
          "Item name",
      },
      {
        prop: "item-prepend",
        description:
          "This slot can be used to prepend items with icons, arrows, checkboxes etc.",
      },
      {
        prop: "item-append",
        description:
          "This slot can be used to append icons, checkboxes, badges etc. to items",
      },
    ]);

    return {
      reference,
      styles,
      events,
      slots,
      ExampleTreeCode,
    };
  },
};
</script>

<style scoped>
</style>
