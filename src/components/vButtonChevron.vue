<template>
  <v-button>
    <!-- @slot default -->
    <slot name="default"></slot>
    <v-chevron
      :switch="switch"
      :initial="initial"
      v-bind="chevron"
    />
  </v-button>
</template>

<script>
import { defaultProps } from "../defaultProps";

export default {
  props: {
    switch: {
      type: Boolean,
      default: false,
    },
    initial: {
      type: String,
      default: "bottom",
    },
    chevron: {
      type: Object,
      default: defaultProps("buttonChevron", "chevron", {}),
    },
  },
};
</script>
