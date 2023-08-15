<template>
  <component
    :is="tag"
    :href="tagHref"
    :class="[
      active
        ? [classes.item.value, variants.item.active]
        : disabled
        ? [classes.item.value, variants.item.default, 'disabled']
        : [classes.item.value, variants.item.default],
    ]"
    @click="autoCloseMenu && hide()"
  >
  <!-- @slot default -->
    <slot name="default"></slot>
  </component>
</template>

<script>
import { computed, inject } from "vue";

export default {
  props: {
    tag: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let { classes, variants, autoCloseMenu, hide } = inject("control-dropdown");

    let tagHref = computed(() => (props.tag == "a" ? "#" : null));

    return {
      classes,
      variants,
      tagHref,
      autoCloseMenu,
      hide,
    };
  },
};
</script>

<style scoped></style>
