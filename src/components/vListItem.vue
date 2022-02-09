<template>
  <component :is="tag" :href="tagHref" :class="itemClass">
    <slot name="default"></slot>
  </component>
</template>

<script>
import { computed, inject } from "vue";

export default {
  props: {
    active: { type: Boolean, default: false },
  },
  setup(props) {
    let classes = inject("classes");
    let states = inject("states");
    let tag = inject("tag");

    let tagHref = computed(() => (tag == "a" ? "#" : null));

    let itemClass = computed(() => {
      if (props.active) return [classes.item.value, states.item.value.active];
      else return classes.item.value;
    });

    return {
      itemClass,
      tag,
      tagHref,
    };
  },
};
</script>

<style scoped></style>
