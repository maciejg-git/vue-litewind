<template>
  <span :class="classes.chip.value">
    <slot name="default"></slot>
  </span>
</template>

<script setup>
import useStyles from "./composition/use-styles";
import { sharedProps, sharedStyleProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("chip"),
  styleChip: {
    type: String,
    default: "",
  },
});

let { classes } = useStyles("chip", props, {
  chip: {
    fixed: "inline-flex items-center align-top",
  },
});
</script>
