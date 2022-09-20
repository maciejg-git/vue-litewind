<template>
  <component
    :is="tag"
    :href="tagHref"
    :class="itemClass"
  >
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
  if (props.active) return [classes.item.value, states.item.value.active];
  else return classes.item.value;
});
</script>

<style scoped></style>
