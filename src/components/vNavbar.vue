<template>
  <nav :class="classes.navbar.value">
    <slot name="default"></slot>
  </nav>
</template>

<script>
import { computed } from "vue";
import useStyles from "./composition/use-styles";

export default {
  props: {
    fixed: { type: Boolean, default: false },
    sticky: { type: Boolean, default: false },
    bottom: { type: Boolean, default: false },
    name: { type: String, default: "navbar" },
    styleNavbar: { type: String, default: "default" },
  },
  setup(props) {
    let { classes } = useStyles(props, {
      navbar: {
        fixed: "fixed-navbar",
        prop: computed(() => {
          return [
            props.fixed ? "fixed" : props.sticky ? "sticky" : "relative",
            props.bottom ? "bottom-0" : "top-0",
          ];
        }),
      },
    });

    return {
      classes,
    };
  },
};
</script>

<style scoped>
.fixed-navbar {
  @apply left-0 z-20;
}
</style>
