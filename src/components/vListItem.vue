<template>
  <component :is="tag" :href="tagHref" :class="itemClass">
    <slot name="default"></slot>
  </component>
</template>

<script>
import { computed, inject } from "vue";

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let { classes, states, tag } = inject("control-list");

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
