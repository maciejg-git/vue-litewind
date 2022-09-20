<template>
  <div :class="classes.header.value">
    <slot name="default"></slot>
  </div>
</template>

<script setup>
import { inject } from "vue";

let { classes } = inject("control-dropdown");
</script>
