<template>
  <span :class="classes.chip.value">
    <slot name="default"></slot>
    <v-close-button
      v-bind="closeButton"
      class="ml-2"
      @click.stop="handleClickCloseButton"
    ></v-close-button>
  </span>
</template>

<script setup>
import vCloseButton from "./vCloseButton.vue";
import useStyles from "./composition/use-styles";
import { sharedProps, sharedStyleProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("chip"),
  closeButton: {
    type: Object,
    default: { base: "round-close-button", styleCloseButton: "small" },
  },
  styleChip: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(['click:close-button'])

let { classes } = useStyles("chip", props, {
  chip: {
    fixed: "inline-flex items-center align-top",
  },
});

let handleClickCloseButton = () => {
  emit('click:close-button')
}
</script>
