<template>
  <component
    :is="tag"
    :href="tagHref"
    :class="itemClass"
  >
  <!-- @slot default -->
    <slot name="default"></slot>
  </component>
</template>

<script setup>
import { computed, inject } from "vue";

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

let { classes, states, tag } = inject("control-list");

let tagHref = computed(() => (tag == "a" ? "#" : null));

let itemClass = computed(() => {
  return [
    classes.item.value,
    props.active && states.item.value.active,
  ]
});
</script>

<style scoped></style>
