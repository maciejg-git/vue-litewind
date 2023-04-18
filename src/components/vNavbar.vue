<template>
  <nav :class="classes.navbar.value">
    <!-- @slot default -->
    <slot name="default"></slot>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import useStyles from "./composition/use-styles";
import { sharedProps, sharedStyleProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("navbar", ["Navbar"]),
  fixed: {
    type: Boolean,
    default: false,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  bottom: {
    type: Boolean,
    default: false,
  },
});

let { classes } = useStyles("navbar", props, {
  navbar: {
    fixed: "left-0 z-20",
    prop: computed(() => {
      return [
        props.fixed ? "fixed" : props.sticky ? "sticky" : "relative",
        props.bottom ? "bottom-0" : "top-0",
      ].join(" ");
    }),
  },
});
</script>

<style scoped></style>
