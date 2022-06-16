<template>
  <ul>
    <v-tree-node
      v-for="i in items"
      :key="i.key"
      :ref="(i) => i && nodeList.push(i)"
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
import { ref, toRef, watch, provide, onMounted, onBeforeUpdate } from "vue";
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
    autoOpenAll: { type: Boolean, default: false },
    selectReturnKeys: { type: Boolean, default: false },
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
  setup(props, { slots, emit, expose }) {
    let { classes, states, variants } = useStyles("tree", props, {
      folder: {
        states: ["opened"],
        variants: ["root-variant"],
      },
      item: null,
      icon: null,
    });

    let selectedItems = ref([]);

    watch(
      selectedItems,
      (value) => {
        if (props.selectReturnKeys) {
          emit(
            "input:selected",
            value.map((i) => i.id)
          );
          return;
        }
        emit("input:selected", [...value]);
      },
      { deep: true }
    );

    let nodeList = ref([]);

    onBeforeUpdate(() => (nodeList.value = []));

    let forNode = (node, callback) => {
      node.nodeList.forEach((node) => forNode(node, callback));
      callback(node);
    };

    let forEachNode = (callback) => {
      nodeList.value.forEach((node) => forNode(node, callback));
    };

    let closeAll = () => forEachNode((i) => i.isFolder && i.close());

    let openAllLevel = (level) => {
      forEachNode((i) => i.itemLevel <= level && i.isFolder && i.open());
    };

    onMounted(() => {
      let level = props.autoOpenAll ? 9999 : props.autoOpenRoot ? 0 : null;
      level !== null && openAllLevel(level);
    });

    provide("control-tree", {
      classes,
      states,
      variants,
      forNode,
      selectedItems,
      filter: toRef(props, "filter"),
      transition: toRef(props, "transition"),
    });

    expose({ openAllLevel, closeAll });

    return {
      slots,
      selectedItems,
      nodeList,
    };
  },
};
</script>
