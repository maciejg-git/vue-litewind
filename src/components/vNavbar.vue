<template>
  <nav :class="classes.navbar.value">
    <slot name="default"></slot>
  </nav>
</template>

<script>
import { ref, computed, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    name: { type: String, default: "navbar" },
    theme: { type: String, default: "default" },
    styleNavbar: { type: String, default: "default" },
  },
  setup(props) {
    let elements = ["navbar"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let fixedClass = {
      navbar: ["sticky", "top-0", "left-0", "w-full"],
    };

    let classes = {
      navbar: computed(() => {
        let c = [...fixedClass.navbar, ...styles.navbar.value];
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
