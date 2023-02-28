<template>
  <div
    class="flex justify-between"
    :class="classes.header.value"
  >
    <div>
      <!-- @slot default -->
      <slot name="default">
        {{ title }}
      </slot>
    </div>
    <v-close-button @click="hide()"></v-close-button>
  </div>
</template>

<script setup>
import { inject } from "vue";

let { classes, title, hide } = inject("control-popover", {});
</script>
