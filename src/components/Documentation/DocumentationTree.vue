<template>
  <h3>Tree</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />

    <h6>Events</h6>
    <table-reference-basic :items="events" reference="event" />

    <h6>Slots</h6>
    <table-reference-basic :items="slots" reference="slot" />

    <h6>Functions</h6>
    <table-reference-basic :items="functions" reference="function" />
  </section>

  <section>
    <h4>Example - simple tree</h4>
    <div class="example">
      <example name="ExampleTreeSimple"></example>
    </div>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example name="ExampleTree"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { sharedProps, styleProps } from "./shared-props"

export default {
  setup() {
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
        default: "'name'",
        description: "Name of the property that hold name of item",
      },
      {
        prop: "item-children",
        type: ["String"],
        default: "'children'",
        description: "Name of the property that hold name of array of children",
      },
      {
        prop: "item-icon",
        type: ["String"],
        default: "'icon'",
        description: "Name of the property that hold name of item's icon. Valid name is the same as for v-icon name prop",
      },
      {
        prop: "item-key",
        type: ["String"],
        default: "'id'",
        description: "Name of the required property that hold unique value for every item.",
      },
      {
        prop: "item-disabled",
        type: ["String"],
        default: "'disabled'",
        description: "Name of the property for disabled items. Disabling folder also disable all of its children",
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
        description: "If `true` mounts tree with root node opened",
      },
      {
        prop: "auto-open-all",
        type: ["Boolean"],
        default: "false",
        description: "If `true` mounts tree with all nodes opened",
      },
      {
        prop: "open-on-click",
        type: ["Boolean"],
        default: "true",
        description: "If `true` clicking on labels opens folders. Clicking indicators always opens folders",
      },
      {
        prop: "allow-select-disabled",
        type: ["Boolean"],
        default: "false",
        description: "If `true` disabled items can be selected",
      },
      {
        prop: "allow-open-disabled",
        type: ["Boolean"],
        default: "false",
        description: "If `true` disabled folders items can be opened",
      },
      {
        prop: "select-return-keys",
        type: ["Boolean"],
        default: "false",
        description: "If `true` @input:selected return array of item keys. If `false` (default) this event returns `array` of item `objects`",
      },
      {
        prop: "select-independent",
        type: ["Boolean"],
        default: "false",
        description: "If `true` folders and items can be selected independently. By default selecting folders selects all children items and selecting every children selects parent folder",
      },
      {
        prop: "show-indicators",
        type: ["Boolean"],
        default: "true",
        description: "Displays open indicators",
      },
      {
        prop: "show-icons",
        type: ["Boolean"],
        default: "true",
        description: "Displays icons if icon or placeholder icon is set",
      },
      {
        prop: "show-checkboxes",
        type: ["Boolean"],
        default: "false",
        description: "Displays checkboxes",
      },
      {
        prop: "placeholder-folder-icon",
        type: ["String", "Object", "Array"],
        default: "undefined",
        description: "Default icon for folders if no icon is provided in items prop. If value is `array` then icons are respectively for closed and opened folders",
      },
      {
        prop: "placeholder-item-icon",
        type: ["String", "Object"],
        default: "undefined",
        description: "Default icon for items if no icon is provided in `items` prop",
      },
      {
        prop: "chevron",
        type: ["Object"],
        default: "{}",
        description: "Attributes of v-chevron (open indicator) component. See documentation for valid values",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade-m",
        description: "Sets animation effect when opening or closing folders. Valid values are: 'fade', 'fade-slide', or `empty string` to disable animations.",
      },
      ...styleProps("tree"),
      ...sharedProps(),
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
        description: "Fired when item is clicked (folders and items). Passes item as argument. Note that disabled items also trigger this event but those can be easly dismissed by checking 'disabled' property",
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
    };
  },
};
</script>

<style scoped>
</style>
