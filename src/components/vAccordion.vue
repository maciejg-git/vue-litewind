<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script>
import { provide } from "vue";

export default {
  setup() {
    let active = null;

    let update = (collapse) => {
      if (collapse.isOpen.value) {
        if (active && active !== collapse) active.collapse()
        active = collapse
      } else {
        if (active === collapse) active = null
      }
    }

    let remove = (collapse) => {
      if (active === collapse) {
        active.collapse()
        active = null
      }
    }

    provide("accordion", { update, remove });
  },
};
</script>
