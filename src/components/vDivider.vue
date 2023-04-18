<template>
  <hr :class="classes.divider.value" />
</template>

<script setup>
import useStyles from "./composition/use-styles";
import { sharedProps, sharedStyleProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("divider", ["Divider"]),
});

let { classes } = useStyles("divider", props, {
  divider: null,
});
</script>

<style scoped></style>
