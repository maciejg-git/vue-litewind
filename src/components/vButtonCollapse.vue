<template>
  <v-button @click="toggle">
    <span class="ml-auto">
      <slot name="default"></slot>
    </span>
    <v-chevron
      :initial="initial"
      :rotate180="rotate180"
      :counter-clockwise="counterClockwise"
      :triangle="triangle"
      :icon="icon"
      :switch="modelValue"
      :style-chevron="styleChevron"
      class="ml-auto"
    />
  </v-button>
</template>

<script>
export default {
  props: {
    modelValue: { type: Boolean, default: false },
    // chevron props
    initial: { type: String, default: "down" },
    rotate180: { type: Boolean, default: true },
    triangle: { type: Boolean, default: false },
    counterClockwise: { type: Boolean, default: true },
    switch: { type: Boolean, default: false },
    icon: { type: String, default: "" },
    styleChevron: { type: String, default: "" },
  },
  setup(props, { emit }) {
    let toggle = () => {
      emit("update:modelValue", !props.modelValue);
    };

    return {
      toggle,
    };
  },
};
</script>
