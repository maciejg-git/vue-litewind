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
    styleCard: { type: String, default: "" },
  },
  setup(props) {
    let { classes } = useStyles("card", props, {
      card: null,
    })

    return {
      classes,
    };
  },
};
</script>

<style scoped></style>
