<template>
  <div :class="classes.card.value" :style="{ width: width }">
    <slot name="default"></slot>
  </div>
</template>

<script>
import useStyles from "./composition/use-styles";
import { sharedStyleProps } from "../shared-props";

export default {
  props: {
    width: {
      type: String,
      default: undefined,
    },
    styleCard: {
      type: String,
      default: "",
    },
    ...sharedStyleProps("card"),
  },
  setup(props) {
    let { classes } = useStyles("card", props, {
      card: null,
    });

    return {
      classes,
    };
  },
};
</script>

<style scoped></style>
