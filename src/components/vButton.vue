<template>
  <component
    :is="tag"
    :href="tagHref"
    type="button"
    :class="[classes.button.value, disabled ? 'disabled' : '']"
  >
    <!-- @slot default -->
    <slot name="default"></slot>
  </component>
</template>

<script setup>
import { computed } from "vue";
import useStyles from "./composition/use-styles";
import { defaultProps } from "../defaultProps";
import { sharedProps, sharedStyleProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("button", ["Button"]),
  disabled: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: "button",
  },
  block: {
    type: Boolean,
    default: false,
  },
});

let { classes } = useStyles("button", props, {
  button: {
    fixed: "justify-center items-center",
    prop: computed(() => {
      return [props.block ? "flex w-full" : "inline-flex"];
    }),
  },
});

// do not include href is element is button
let tagHref = computed(() => (props.tag == "a" ? "#" : null));
</script>

<style scoped lang="postcss"></style>
