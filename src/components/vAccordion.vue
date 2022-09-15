<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script setup>
import { provide } from "vue";

    let active = null;

    let update = (collapse) => {
      if (collapse.isOpen.value) {
        active && active.collapse()
        active = collapse
        return;
      }
      if (active === collapse) active = null
    }

    let remove = (collapse) => {
      if (active === collapse) {
        active.collapse()
        active = null
      }
    }

    provide("accordion", { update, remove });
</script>
