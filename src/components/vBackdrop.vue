<template>
  <transition name="fade-backdrop">
    <div v-if="isOpen" class="backdrop fixed inset-0 overflow-y-auto min-h-screen z-30"></div>
  </transition>
</template>

<script>
export default {
  props: {
    isOpen: { type: Boolean, default: false },
  },
  setup() {
    
  },
}
</script>

<style scoped>
.fade-backdrop-enter-active,
.fade-backdrop-leave-active {
  transition: opacity var(--backdrop-transition-duration) ease;
}
.fade-backdrop-enter-from,
.fade-backdrop-leave-to {
  opacity: 0;
}
</style>
