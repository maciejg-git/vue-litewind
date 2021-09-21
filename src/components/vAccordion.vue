<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script>
import { ref, provide } from "vue";

export default {
  props: {
  },
  setup(props) {
    let active = ref(0);

    let updateActive = (value) => (active.value = value);

    provide("accordion", { active, updateActive });

    return {
    };
  },
};
</script>
