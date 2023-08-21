<template>
  <nav :class="classes.navbar.value">
    <!-- @slot default -->
    <slot name="default"></slot>
  </nav>
</template>

<script setup>
import { computed, inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles";
import { sharedProps, sharedModProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("navbar", ["Navbar"]),
  position: {
    type: String,
    default: "relative",
  },
  bottom: {
    type: Boolean,
    default: false,
  },
});

let { navbar } = inject("mods", {});

let elements = {
  navbar: {
    fixed: "left-0 z-20",
    computed: computed(() => {
      return [
        props.position === "fixed"
          ? "fixed"
          : props.position === "absolute"
          ? "absolute"
          : "relative",
        props.bottom ? "bottom-0" : "top-0",
      ].join(" ");
    }),
  },
};

let { classes } = useTailwindStyles(props, navbar, elements);
</script>

<style scoped></style>
