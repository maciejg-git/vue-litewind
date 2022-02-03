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

    let updateActive = (uid, c) => {
      if (collapse && active.value !== uid) collapse()
      active.value = uid;
      collapse = c;
    }

    provide("accordion", { updateActive });
  },
};
</script>
