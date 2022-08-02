<template>
  <input
    v-bind="$attrs"
    type="checkbox"
    :class="[
        classes.checkbox.value,
        attrs.disabled === '' || attrs.disabled === true
          ? states.checkbox.disabled
          : '',
      ]"
  />
</template>

<script>
// composition
import useStyles from "./composition/use-styles";
// props
import { sharedStyleProps } from "../shared-props";

export default {
  props: {
    ...sharedStyleProps("checkbox"),
  },
  inheritAttrs: false,
  setup(props, { attrs }) {
    let { classes, states } = useStyles("checkbox", props, {
      checkbox: {
        states: ["disabled"],
      },
    });

    return {
      classes,
      states,
      attrs,
    };
  },
};
</script>

<style scoped></style>
