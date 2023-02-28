<template>
  <div
    :class="classes.card.value"
    :style="{ width: width }"
  >
  <!-- @slot default -->
    <slot name="default"></slot>
  </div>
</template>

<script setup>
import useStyles from "./composition/use-styles";
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("card"),
  width: {
    type: String,
    default: undefined,
  },
  styleCard: {
    type: String,
    default: defaultProps("card", "styleCard", ""),
  },
});

let { classes } = useStyles("card", props, {
  card: null,
});
</script>

<style scoped></style>
