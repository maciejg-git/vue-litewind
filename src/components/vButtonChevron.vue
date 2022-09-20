<template>
  <v-button>
    <slot name="default"></slot>
    <v-chevron
      :switch="switch"
      v-bind="chevron"
    />
  </v-button>
</template>

<script>
import { defaultProps } from "../defaultProps"

export default {
  props: {
    switch: {
      type: Boolean,
      default: false,
    },
    initial: {
      type: String,
      default: "down",
    },
    chevron: {
      type: Object,
      default: defaultProps("buttonChevron", "chevron", {}),
    }
  },
};
</script>
