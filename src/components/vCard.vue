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

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("card", ["Card"]),
  width: {
    type: String,
    default: undefined,
  },
});

let { classes } = useStyles("card", props, {
  card: null,
});
</script>

<style scoped></style>
