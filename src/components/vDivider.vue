<template>
  <hr :class="classes.divider.value" />
</template>

<script setup>
import { inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import { sharedProps, sharedModProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("divider", ["Divider"]),
  modDivider: {
    type: String,
    default: "",
  }
});

let { divider } = inject("mods", {})

let elements = {
  divider: null,
}

let { classes } = useTailwindStyles(props, divider, elements)
</script>

<style scoped></style>
