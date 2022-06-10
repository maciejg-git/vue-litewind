<template>
  <ul>
    <v-tree-node
      v-for="(i, index) in items"
      :ref="(i) => (nodeList[index] = i)"
      v-bind="$attrs"
      :items="i"
    >
      <template v-for="(name, slot) of slots" #[slot]="items">
        <slot :name="slot" v-bind="items"></slot>
      </template>
    </v-tree-node>
  </ul>
</template>

<script>
// vue
import { ref, toRef, watch, provide, onMounted } from "vue";
// composition
import useStyles from "./composition/use-styles";
// components
import vTreeNode from "./vTreeNode.vue";
// props
import { sharedStyleProps } from "../shared-props";

export default {
  props: {
    items: { type: Object, default: [] },
    filter: { type: String, default: "" },
    openAll: { type: Boolean, default: false },
    autoOpenRoot: { type: Boolean, default: false },
    selectIndependent: { type: Boolean, default: false },
    transition: { type: String, default: "fade-m" },
    styleFolder: { type: String, default: "" },
    styleItem: { type: String, default: "" },
    styleIcon: { type: String, default: "" },
    ...sharedStyleProps("tree"),
  },
  components: {
    vTreeNode,
  },
  inheritAttrs: false,
  setup(props, { slots, emit }) {
    let { classes, states } = useStyles("tree", props, {
      folder: {
        states: ["opened"],
      },
      item: null,
      icon: null,
    });

    let selectedItems = ref([]);

    watch(selectedItems, (value) => emit("input:selected", value), { deep: true })

    let nodeList = ref([]);

    let forNode = (node, callback) => {
      node.nodeList.forEach((node) => forNode(node, callback));
      callback(node);
    };

    let forEachNode = (callback) => {
      nodeList.value.forEach((node) => {
        forNode(node, callback);
      });
    };

    let openAll = () => forEachNode((i) => i.isFolder && i.open());

    let closeAll = () => forEachNode((i) => i.isFolder && i.close());

    let openAllLevel = (level) => {
      forEachNode((i) => i.itemLevel <= level && i.isFolder && i.open());
    };

    onMounted(() => props.autoOpenRoot && openAllLevel(0));

    watch(
      () => props.openAll,
      (val) => (val ? openAll() : closeAll())
    );

    console.log(selectedItems);

    provide("control-tree", {
      classes,
      states,
      forNode,
      selectedItems,
      filter: toRef(props, "filter"),
      transition: toRef(props, "transition"),
    });

    return {
      slots,
      selectedItems,
      nodeList,
    };
  },
};
</script>
