<template>
  <div
    :class="classes.list.value"
    :style="{ width: width }"
  >
    <!-- @slot default -->
    <slot name="default"></slot>
  </div>
</template>

<script setup>
import { provide, toRef, inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import { sharedModProps, sharedProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("list", ["List", "Item"]),
  width: {
    type: String,
    default: undefined,
  },
  tag: {
    type: String,
    default: defaultProps("list", "tag", "div"),
  },
});

let { list } = inject("mods", {})

let elements = {
  list: {
    fixed: "flex flex-col",
  },
  item: {
    externalVariants: ["variant"]
  }
}

let { classes, variants } = useTailwindStyles(props, list, elements)

provide("control-list", { classes, variants, tag: toRef(props, "tag") });
// provide("classes", classes);
// provide("states", states);
// provide("tag", toRef(props, "tag"));
</script>

<style scoped></style>
