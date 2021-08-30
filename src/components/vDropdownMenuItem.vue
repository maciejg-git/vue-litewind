<template>
  <component
    :is="tag"
    :href="tagHref"
    :class="['fixed-item',
      active
        ? [classes.item.value, states.item.active.value]
        : disabled
        ? [classes.item.value, states.item.disabled.value]
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
    tag: { type: String, default: "a" },
    disabled: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
  },
  setup(props) {
    let classes = inject("classes");
    let states = inject("states");

    let autoCloseMenu = inject("autoCloseMenu");
    let hide = inject("hide");

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
