<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script>
import { ref, provide } from "vue";

export default {
  setup() {
    let active = ref(null)
    let collapse = null;

    let update = (uid, state, callback) => {
      if (state && active.value !== uid) {
        if (active.value) collapse()
        active.value = uid;
        collapse = callback;
      } else if (!state && active.value === uid) {
        active.value = null;
        collapse = null;
      }
    }

    provide("accordion", { update });
  },
};
</script>
