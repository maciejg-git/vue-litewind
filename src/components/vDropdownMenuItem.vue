<template>
  <component
    :is="tag"
    :href="tagHref"
    :class="[
      active
        ? classes.menuItemActive.value
        : disabled
        ? classes.menuItemDisabled.value
        : classes.menuItem.value,
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
    tag: { type: String, default: "a" },
    disabled: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
  },
  setup(props) {
    let classes = inject("classes");
    let autoCloseMenu = inject("autoCloseMenu");
    let hide = inject("hide");

    let tagHref = computed(() => (props.tag == "a" ? "#" : null));

    return {
      classes,
      tagHref,
      autoCloseMenu,
      hide,
    };
  },
};
</script>

<style scoped></style>
