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
        type: ["Array"],
        default: "undefined",
        description: "Array of items to make tree from",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade-m",
        description: "Sets an animation when opening or closing folders",
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
        prop: "update:page",
        description: "Fired when next page is displayed (scroll reach end of dropdown menu)",
      },
      {
        prop: "state:focus",
        description: "Input element recieved focus",
      },
    ]);

    let slots = ref([
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
