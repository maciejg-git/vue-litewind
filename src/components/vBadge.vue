<template>
  <span :class="classes.badge.value">
    <slot name="default"></slot>
  </span>
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import useStyles from "../use-styles";
import { removeTailwindClasses } from "../tools.js";

export default {
  props: {
    name: { type: String, default: "badge" },
    styleBadge: { type: String, default: "default" },
  },
  setup(props) {
    let elements = ["badge"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let classes = {
      badge: computed(() => {
        let c = [...styles.badge.value];
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
