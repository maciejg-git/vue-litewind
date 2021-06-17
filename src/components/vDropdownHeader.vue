<template>
  <div :class="classes.itemHeader.value">
    <slot name="default"></slot>
  </div>
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
