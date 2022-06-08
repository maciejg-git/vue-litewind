<template>
  <ul>
    <v-tree-node ref="root" v-bind="$attrs" :level="0">
      <template v-for="(name, slot) of slots" #[slot]="items">
        <slot :name="slot" v-bind="items"></slot>
      </template>
    </v-tree-node>
  </ul>
</template>

<script>
// vue
import { ref, toRef, provide, nextTick } from "vue";
// composition
import useStyles from "./composition/use-styles";
// components
import vTreeNode from "./vTreeNode.vue";
// props
import { sharedStyleProps } from "../shared-props";

export default {
  props: {
    filter: { type: String, default: "" },
    openAll: { type: Boolean, default: false },
    autoOpenRoot: { type: Boolean, default: false },
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
  setup(props, { slots }) {
    let { classes, states } = useStyles("tree", props, {
      folder: {
        states: ["opened"],
      },
      item: null,
      icon: null,
    });

    let root = ref(null)

    nextTick(() => {
      if (root.value) root.value.isOpen = true
    })

    provide("control-tree", {
      classes,
      states,
      openAll: toRef(props, "openAll"),
      filter: toRef(props, "filter"),
      transition: toRef(props, "transition"),
    });

    return {
      slots,
      root,
    }
  },
};
</script>
