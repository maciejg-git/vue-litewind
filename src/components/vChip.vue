<template>
  <span :class="classes.chip.value">
    <!-- @slot default -->
    <slot name="default"></slot>
    <v-close-button
      v-bind="closeButton"
      class="ml-2"
      @click.stop="handleClickCloseButton"
    ></v-close-button>
  </span>
</template>

<script setup>
import { inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import vCloseButton from "./vCloseButton.vue";
import { sharedProps, sharedModProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("chip", ["Chip"]),
  closeButton: {
    type: Object,
    default: { base: "roundCloseButton", modCloseButton: "size:small" },
  },
});

const emit = defineEmits(["click:close-button"]);

let { chip } = inject("mods", {})

let elements = {
  chip: {
    fixed: "inline-flex items-center align-top",
  }
}

let { classes } = useTailwindStyles(props, chip, elements)

let handleClickCloseButton = () => {
  emit("click:close-button");
};
</script>
