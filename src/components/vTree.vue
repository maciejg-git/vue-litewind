<template>
  <ul>
    <v-tree-node v-bind="$attrs"></v-tree-node>
  </ul>
</template>

<script>
import { provide } from "vue"
import useStyles from "./composition/use-styles";
import vTreeNode from "./vTreeNode.vue"
import { sharedStyleProps } from "../shared-props";

export default {
  props: {
    styleFolder: { type: String, default: "" },
    styleItem: { type: String, default: "" },
    ...sharedStyleProps("tree"),
  },
  components: {
    vTreeNode,
  },
  inheritAttrs: false,
  setup(props) {
    let { classes, states } = useStyles("tree", props, {
      folder: {
        states: ["opened"],
      },
      item: null,
    });
    
    provide("tree", { classes, states })
  },
}
</script>
