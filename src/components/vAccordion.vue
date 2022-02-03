<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script>
import { ref, provide } from "vue";

export default {
  setup() {
    let activeUid = ref(null)
    let collapse = null;

    let update = (uid, state, callback) => {
      if (state && activeUid.value !== uid) {
        if (activeUid.value) collapse()
        activeUid.value = uid;
        collapse = callback;
      } else if (!state && activeUid.value === uid) {
        activeUid.value = null;
        collapse = null;
      }
    }

    provide("accordion", { update });
  },
};
</script>
