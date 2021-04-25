<template>
  <component :is="tag" :href="tagHref" :class="itemClass">
    <slot name="default"></slot>
  </component>
</template>

<script>
import { computed, inject } from "vue";

export default {
  props: {
    active: Boolean,
  },
  setup(props) {
    let classes = inject("classes");
    let tag = inject("tag");
    let tagHref = computed(() => (tag == "a" ? "#" : null));

    let itemClass = computed(() => {
      if (props.active) return classes.itemActive.value;
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

<style scoped>
</style>
