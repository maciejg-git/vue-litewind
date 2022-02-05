<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script>
import { ref, provide } from "vue";

export default {
  setup() {
    let activeUid = ref(null);
    let collapse = null;

    let update = (uid, isOpen, callback) => {
      if (isOpen) {
        if (activeUid.value !== uid) {
          if (activeUid.value) collapse();
          activeUid.value = uid;
          collapse = callback;
        }
      } else {
        if (activeUid.value === uid) {
          activeUid.value = null;
          collapse = null;
        }
      }
    };

    provide("accordion", { update });
  },
};
</script>
