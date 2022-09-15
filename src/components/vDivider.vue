<template>
  <hr :class="classes.divider.value" />
</template>

<script setup>
import useStyles from "./composition/use-styles";
import { sharedProps, sharedStyleProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  styleDivider: {
    type: [String, Array],
    default: "",
  },
  ...sharedStyleProps("divider"),
});

let { classes } = useStyles("divider", props, {
  divider: null,
});
</script>

<style scoped></style>
