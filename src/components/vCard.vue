<template>
  <div :class="classes.card.value" :style="{width: width}">
    <slot name="default"></slot>
  </div>
</template>

<script>
import { computed, inject } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    width: { type: String, default: undefined },
    name: { type: String, default: "card" },
    theme: { type: String, default: "default" },
    styleCard: { type: String, default: "default" },
  },
  setup(props) {
    let s = inject("styles")

    let elements = ["card"];

    let { styles } = useStyles(s, props, elements);

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
