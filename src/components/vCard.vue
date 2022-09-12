<template>
  <div :class="classes.card.value" :style="{ width: width }">
    <slot name="default"></slot>
  </div>
</template>

<script>
import useStyles from "./composition/use-styles";
import { sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

export default {
  props: {
    width: {
      type: String,
      default: undefined,
    },
    styleCard: {
      type: String,
      default: defaultProps("card", "styleCard", ""),
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
