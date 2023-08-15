<template>
  <component
    :is="tag"
    :href="tagHref"
    type="button"
    :class="[classes.button.value, disabled ? variants.button.disabled : '']"
  >
    <!-- @slot default -->
    <slot name="default"></slot>
  </component>
</template>

<script setup>
import { computed, inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import { sharedProps, sharedModProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("button", ["Button"]),
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

let { button } = inject("mods", {})

let elements = {
  button: {
    fixed: "justify-center items-center",
    computed: computed(() => {
      return [props.block ? "flex w-full" : "inline-flex"];
    }),
    externalVariants: ["events"],
  }
}

let { classes, variants } = useTailwindStyles(props, button, elements)

// do not include href is element is button
let tagHref = computed(() => (props.tag == "a" ? "#" : null));
</script>

<style scoped lang="postcss"></style>
