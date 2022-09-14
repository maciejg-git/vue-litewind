<template>
  <component
    :is="tag"
    :href="tagHref"
    type="button"
    :class="[
      classes.button.value,
      disabled ? states.button.value.disabled : '',
    ]"
  >
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
  styleButton: {
    type: String,
    default: defaultProps("button", "styleButton", ""),
  },
  ...sharedStyleProps("button"),
});

let { classes, states } = useStyles("button", props, {
  button: {
    fixed: "justify-center items-center",
    prop: computed(() => {
      return [props.block ? "flex" : "inline-flex"];
    }),
    states: ["disabled"],
  },
});

// do not include href is element is button
let tagHref = computed(() => (props.tag == "a" ? "#" : null));
</script>

<style scoped lang="postcss"></style>
