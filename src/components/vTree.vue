<template>
  <ul>
    <v-tree-node v-bind="$attrs">
      <template v-for="(_, slot) of slots" #[slot]="i">
        <slot :name="slot" v-bind="i"></slot>
      </template>
    </v-tree-node>
  </ul>
</template>

<script>
// vue
import { toRef, provide } from "vue";
// composition
import useStyles from "./composition/use-styles";
// components
import vTreeNode from "./vTreeNode.vue";
// props
import { sharedStyleProps } from "../shared-props";

export default {
  props: {
    transition: { type: String, default: "fade-m" },
    styleFolder: { type: String, default: "" },
    styleItem: { type: String, default: "" },
    ...sharedStyleProps("tree"),
  },
  components: {
    vTreeNode,
  },
  inheritAttrs: false,
  setup(props, { slots }) {
    let { classes, states } = useStyles("tree", props, {
      folder: {
        // fixed: ["inline-flex"],
        states: ["opened"],
      },
      item: {
        // fixed: ["inline-flex"],
      },
    });

    provide("tree", {
      classes,
      states,
      transition: toRef(props, "transition"),
    });

    return {
      slots,
    }
  },
};
</script>
