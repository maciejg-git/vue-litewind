<template>
  <component
    :is="tag"
    :href="tagHref"
    type="button"
    :class="classes.button.value"
  >
    <slot name="default"></slot>
  </component>
</template>

<script>
import { computed } from "vue";
import useStyles from "./composition/use-styles";

export default {
  props: {
    disabled: { type: Boolean, default: false },
    tag: { type: String, default: "button" },
    block: { type: Boolean, default: false },
    name: { type: String, default: "button" },
    styleButton: { type: String, default: "default" },
  },
  setup(props) {
    let { classes } = useStyles(props, {
      button: {
        fixed: "fixed-button",
        prop: computed(() => {
          return [
            props.block ? "w-full" : "",
            props.disabled ? ["opacity-50", "pointer-events-none"] : "",
          ];
        }),
      },
    });

    let tagHref = computed(() => (props.tag == "a" ? "#" : null));

    return {
      classes,
      tagHref,
    };
  },
};
</script>

<style scoped lang="postcss">
.fixed-button {
  @apply inline-flex justify-center items-center;
}
</style>
