<template>
  <v-button @click="toggle">
    <span class="ml-auto">
      <slot name="default"></slot>
    </span>
    <v-chevron
      initial="down"
      rotate180
      counter-clockwise
      :triangle="triangle"
      :icon="icon"
      :switch="modelValue"
      class="ml-auto"
    />
  </v-button>
</template>

<script>
export default {
  props: {
    modelValue: { type: Boolean, default: false },
    triangle: { type: Boolean, default: false },
    icon: { type: String, default: "" },
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
