<template>
  <div class="flex justify-between" :class="classes.header.value">
    <div>
      <slot name="default">
        {{ title }}
      </slot>
    </div>
    <v-close-button @click="hide()"></v-close-button>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    let { classes, title, hide } = inject("control-popover", {});

    return {
      classes,
      title,
      hide,
    };
  },
};
</script>
