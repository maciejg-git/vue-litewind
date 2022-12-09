<template>
  <component :is="name || icon || iconTypes[iconType] || null"></component>
</template>

<script setup>
import { inject } from "vue";

defineProps({
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
});

let iconTypes = inject("icon-types", {});
</script>

<style></style>
