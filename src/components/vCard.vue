<template>
  <div :class="classes.card.value" :style="{width: width}">
    <slot name="default"></slot>
  </div>
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import useStyles from "../use-styles";
import { removeTailwindClasses } from "../tools.js";

export default {
  props: {
    width: { type: String, default: undefined },
    name: { type: String, default: "card" },
    card: { type: String, default: "default" },
  },
  setup(props) {
    let elements = ["card"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let classes = {
      card: computed(() => {
        let c = [...styles.card.value];
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
