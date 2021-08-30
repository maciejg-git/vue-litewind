<template>
  <div :class="classes.card.value" :style="{width: width}">
    <slot name="default"></slot>
  </div>
</template>

<script>
import useStyles from "./composition/use-styles";

export default {
  props: {
    width: { type: String, default: undefined },
    name: { type: String, default: "card" },
    theme: { type: String, default: "default" },
    styleCard: { type: String, default: "default" },
  },
  setup(props) {
    let { classes } = useStyles(props, {
      card: null,
    })

    return {
      classes,
    };
  },
};
</script>

<style scoped></style>
