<template>
  <ul role="tree">
    <v-tree-node
      v-for="i in items"
      :key="i.key"
      :ref="(i) => i && nodeList.push(i)"
      v-bind="$attrs"
      :items="i"
    >
      <!-- @slot item -->
      <!-- @slot icon -->
      <!-- @slot item-prepend -->
      <!-- @slot name -->
      <!-- @slot item-append -->
      <template
        v-for="(name, slot) of $slots"
        #[slot]="items"
      >
        <slot
          :name="slot"
          v-bind="items"
        ></slot>
      </template>
    </v-tree-node>
  </ul>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { ref, toRef, watch, provide, onMounted, onBeforeUpdate, inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import vTreeNode from "./vTreeNode.vue";
import { sharedProps, sharedModProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("tree", ["Folder", "Item", "Icon"]),
  items: {
    type: Object,
    default: [],
  },
  itemName: {
    type: String,
    default: "name",
  },
  itemChildren: {
    type: String,
    default: "children",
  },
  itemIcon: {
    type: String,
    default: "icon",
  },
  itemDisabled: {
    type: String,
    default: "disabled",
  },
  itemKey: {
    type: String,
    default: "id",
  },
  filter: {
    type: String,
    default: "",
  },
  autoOpenRoot: {
    type: Boolean,
    default: defaultProps("tree", "autoOpenRoot", false),
  },
  autoOpenAll: {
    type: Boolean,
    default: false,
  },
  selectReturnKeys: {
    type: Boolean,
    default: defaultProps("tree", "selectReturnKeys", false),
  },
  selectIndependent: {
    type: Boolean,
    default: defaultProps("tree", "selectIndependent", false),
  },
  openOnClick: {
    type: Boolean,
    default: defaultProps("tree", "openOnClick", true),
  },
  allowSelectDisabled: {
    type: Boolean,
    default: defaultProps("tree", "allowSelectDisabled", false),
  },
  allowOpenDisabled: {
    type: Boolean,
    default: defaultProps("tree", "allowOpenDisabled", false),
  },
  showCheckboxes: {
    type: Boolean,
    default: defaultProps("tree", "showCheckboxes", false),
  },
  showIcons: {
    type: Boolean,
    default: defaultProps("tree", "showIcons", true),
  },
  showIndicators: {
    type: Boolean,
    default: defaultProps("tree", "showIndicators", true),
  },
  placeholderItemIcon: {
    type: [String, Object],
    default: defaultProps("tree", "placeholderItemIcon", undefined),
  },
  placeholderFolderIcon: {
    type: [String, Object],
    default: defaultProps("tree", "placeholderFolderIcon", undefined),
  },
  chevron: {
    type: Object,
    default: defaultProps("tree", "chevron", {}),
  },
  transition: {
    type: String,
    default: defaultProps("tree", "transition", "fade"),
  },
});

const emit = defineEmits(["input:selected", "input:click"]);

let { tree } = inject("mods", {})

let elements = {
  folder: {
    externalVariants: ["variant"],
  },
  item: null,
  icon: null,
}

let { classes, variants } = useTailwindStyles(props, tree, elements)

let selectedItems = ref([]);

watch(
  selectedItems,
  (value) => {
    if (props.selectReturnKeys) {
      emit(
        "input:selected",
        value.map((i) => i[props.itemKey])
      );
      return;
    }
    emit("input:selected", [...value]);
  },
  { deep: true }
);

let nodeList = ref([]);

onBeforeUpdate(() => {
  nodeList.value = [];
});

let forNode = (node, callback) => {
  node.nodeList.forEach((node) => forNode(node, callback));
  callback(node);
};

let forEachNode = (callback) => {
  nodeList.value.forEach((node) => forNode(node, callback));
};

let closeAll = () => {
  forEachNode((i) => i.isFolder && i.close());
};

let openAllLevel = (level) => {
  forEachNode((i) => i.itemLevel <= level && i.isFolder && i.open());
};

onMounted(() => {
  let level = props.autoOpenAll ? 9999 : props.autoOpenRoot ? 0 : null;
  if (level !== null) openAllLevel(level);
});

provide("control-tree", {
  classes,
  variants,
  forNode,
  selectedItems,
  filter: toRef(props, "filter"),
  transition: toRef(props, "transition"),
  itemName: toRef(props, "itemName"),
  itemChildren: toRef(props, "itemChildren"),
  itemIcon: toRef(props, "itemIcon"),
  itemDisabled: toRef(props, "itemDisabled"),
  itemKey: toRef(props, "itemKey"),
  showIcons: toRef(props, "showIcons"),
  showCheckboxes: toRef(props, "showCheckboxes"),
  showIndicators: toRef(props, "showIndicators"),
  selectIndependent: toRef(props, "selectIndependent"),
  openOnClick: toRef(props, "openOnClick"),
  allowSelectDisabled: toRef(props, "allowSelectDisabled"),
  allowOpenDisabled: toRef(props, "allowOpenDisabled"),
  placeholderItemIcon: toRef(props, "placeholderItemIcon"),
  placeholderFolderIcon: toRef(props, "placeholderFolderIcon"),
  chevron: toRef(props, "chevron"),
  parentEmit: emit,
});

defineExpose({ openAllLevel, closeAll });
</script>
