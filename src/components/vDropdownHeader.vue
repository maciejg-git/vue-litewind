<template>
  <h6 :class="classes.itemHeader.value">
    <slot name="default"></slot>
  </h6>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    let classes = inject("classes");

    return {
      classes,
    };
  },
};
</script>
