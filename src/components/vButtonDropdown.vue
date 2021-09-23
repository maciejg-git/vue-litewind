<template>
  <v-button>
    <slot name="default"></slot>
    <v-chevron
      :initial="placement"
      :triangle="triangle"
      :icon="icon"
      class="ml-2"
    />
  </v-button>
</template>

<script>
import { computed, inject } from "vue";
export default {
  props: {
    triangle: { type: Boolean, default: false },
    icon: { type: String, default: "" },
  },
  setup() {
    let initialPlacement = inject("placement", "down");
    let placement = computed(() => {
      let i = initialPlacement.value.split("-")[0];
      return i == "auto"
        ? "down"
        : i == "top"
        ? "up"
        : i == "bottom"
        ? "down"
        : i;
    });

    return {
      placement,
    };
  },
};
</script>
