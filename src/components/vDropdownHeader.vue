<template>
  <div :class="classes.header.value">
    <slot name="default"></slot>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    let { classes } = inject("control-dropdown");

    return {
      classes,
    };
  },
};
</script>
