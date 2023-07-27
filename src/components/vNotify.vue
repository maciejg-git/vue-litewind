<template>
<div>
  <slot name="default"></slot>
</div>
</template>

<script setup>
import { inject } from "vue"

let { classes, states } = inject("notify-container")
</script>
