<template>
  <component
    :is="tag"
    :href="tagHref"
    :class="[
      active
        ? [classes.item.value, states.item.value.active]
        : disabled
        ? [classes.item.value, states.item.value.disabled]
        : classes.item.value,
    ]"
    @click="autoCloseMenu && hide()"
  >
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
    let { classes, states, autoCloseMenu, hide } = inject("control-dropdown");

    let tagHref = computed(() => (props.tag == "a" ? "#" : null));

    return {
      classes,
      states,
      tagHref,
      autoCloseMenu,
      hide,
    };
  },
};
</script>

<style scoped></style>
