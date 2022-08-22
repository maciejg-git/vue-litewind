<template>
  <component :is="name || icon || iconTypes[iconType] || null"></component>
</template>

<script>
import { inject } from "vue";

export default {
  props: {
    name: {
      type: [String, Object],
      default: "",
    },
    icon: {
      type: [String, Object],
      default: "",
    },
    iconType: {
      type: String,
      default: "",
    },
  },
  setup() {
    let iconTypes = inject("icon-types", {});

    return {
      iconTypes,
    };
  },
};
</script>

<style></style>
