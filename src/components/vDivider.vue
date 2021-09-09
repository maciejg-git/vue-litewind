<template>
  <hr class="classes.divider.value" />
</template>

<script>
import useStyles from "./composition/use-styles";

export default {
  props: {
    name: { type: String, default: "divider" },
    styleDivider: { type: [String, Array], default: "" },
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
