<template>
  <hr :class="classes.divider.value" />
</template>

<script>
import useStyles from "./composition/use-styles";
import { sharedStyleProps } from "../sharedProps"

export default {
  props: {
    styleDivider: { type: [String, Array], default: "" },
    ...sharedStyleProps("divider"),
  },
  setup(props) {
    let { classes } = useStyles("divider", props, {
      divider: null,
    });

    return {
      classes,
    };
  },
};
</script>

<style scoped></style>
