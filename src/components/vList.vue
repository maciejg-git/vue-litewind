<template>
  <div
    :class="classes.list.value"
    :style="{ width: width }"
  >
    <slot name="default"></slot>
  </div>
</template>

<script setup>
import { provide, toRef } from "vue";
import useStyles from "./composition/use-styles";
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
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
});

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
</script>

<style scoped></style>
