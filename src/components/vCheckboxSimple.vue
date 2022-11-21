<template>
  <input
    type="checkbox"
    :class="[
     'tw-form-checkbox-reset',
      classes.checkbox.value,
      $attrs.disabled === '' || $attrs.disabled === true
        ? states.checkbox.disabled
        : '',
    ]"
  />
</template>

<script setup>
import useStyles from "./composition/use-styles";
import { sharedProps, sharedStyleProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("checkbox"),
});

let { classes, states } = useStyles("checkbox", props, {
  checkbox: {
    states: ["disabled"],
  },
});
</script>

<style scoped></style>
