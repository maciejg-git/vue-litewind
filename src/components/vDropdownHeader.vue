<template>
  <div :class="classes.menuItemHeader.value">
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
