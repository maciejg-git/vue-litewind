<template>
  <nav :class="classes.navbar.value">
    <slot name="default"></slot>
  </nav>
</template>

<script>
import { computed, inject } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    fixed: { type: Boolean, default: false },
    sticky: { type: Boolean, default: false },
    name: { type: String, default: "navbar" },
    theme: { type: String, default: "default" },
    styleNavbar: { type: String, default: "default" },
  },
  setup(props) {
    let s = inject("styles")

    let elements = ["navbar"];

    let { styles } = useStyles(s, props, elements);

    let fixedClass = {
      navbar: ["top-0", "left-0", "z-20"],
    };

    let classes = {
      navbar: computed(() => {
        let c = [
          props.fixed ? "fixed" : props.sticky ? "sticky" : "relative",
          ...fixedClass.navbar,
          ...styles.navbar.value,
        ];
        return removeTailwindClasses(c);
      }),
    };

    return {
      classes,
    };
  },
};
</script>

<style scoped></style>
