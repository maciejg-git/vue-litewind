<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script>
import { provide } from "vue";

export default {
  setup() {
    let collapse = null;

    let updateActive = (c) => {
      if (collapse && collapse != c) collapse()
      collapse = c;
    }

    provide("accordion", { updateActive });
  },
};
</script>
