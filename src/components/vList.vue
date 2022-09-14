<template>
  <div
    :class="classes.list.value"
    :style="{ width: width }"
  >
    <slot name="default"></slot>
  </div>
</template>

<script>
// vue
import { provide, toRef } from "vue";
// composition
import useStyles from "./composition/use-styles";
// props
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

export default {
  props: {
    ...sharedProps(),
    width: {
      type: String,
      default: undefined,
    },
    tag: {
      type: String,
      default: defaultProps("list", "tag", "div"),
    },
    styleList: {
      type: String,
      default: defaultProps("list", "styleList", ""),
    },
    styleItem: {
      type: String,
      default: defaultProps("list", "styleItem", ""),
    },
    ...sharedStyleProps("list"),
  },
  setup(props) {
    let { classes, states } = useStyles("list", props, {
      list: {
        fixed: "flex flex-col",
      },
      item: {
        states: ["active"],
      },
    });

    provide("control-list", { classes, states, tag: toRef(props, "tag") });
    provide("classes", classes);
    provide("states", states);
    provide("tag", toRef(props, "tag"));

    return {
      classes,
    };
  },
};
</script>

<style scoped></style>
