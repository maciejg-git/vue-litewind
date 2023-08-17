<template>
  <div
    :class="[classes.card.value, groupClass]"
    :style="{ width: width }"
  >
    <!-- @slot default -->
    <slot name="default"></slot>
    <slot name="overlay"></slot>
  </div>
</template>

<script setup>
import { inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import { sharedProps, sharedModProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("card", ["Card"]),
  width: {
    type: String,
    default: undefined,
  },
});

let { card } = inject("mods", {})

let elements = {
  card: {
    fixed: "relative"
  },
}

let { classes, groupClass } = useTailwindStyles(props, card, elements)
</script>

<style scoped></style>
