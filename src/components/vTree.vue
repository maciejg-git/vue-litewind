<template>
  <ul>
    <v-tree-node
      v-for="i in items"
      :key="i.key"
      :ref="(i) => i && nodeList.push(i)"
      v-bind="$attrs"
      :items="i"
    >
      <template
        v-for="(name, slot) of slots"
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
import { ref, toRef, watch, provide, onMounted, onBeforeUpdate } from "vue";
import useStyles from "./composition/use-styles";
import vTreeNode from "./vTreeNode.vue";
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  items: {
    type: Object,
    default: [],
  },
  filter: {
    type: String,
    default: "",
  },
  openAll: {
    type: Boolean,
    default: false,
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
  transition: {
    type: String,
    default: defaultProps("tree", "transition", "fade"),
  },
  styleFolder: {
    type: String,
    default: defaultProps("tree", "styleFolder", ""),
  },
  styleItem: {
    type: String,
    default: defaultProps("tree", "styleItem", ""),
  },
  styleIcon: {
    type: String,
    default: defaultProps("tree", "styleIcon", ""),
  },
  ...sharedStyleProps("tree"),
});

const emit = defineEmits(["input:selected"]);

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
  if (level !== null) openAllLevel(level);
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

defineExpose({ openAllLevel, closeAll });
</script>
