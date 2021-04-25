<template>
  <div class="overflow-hidden">
    <transition name="fade-collapse">
      <div v-show="modelValue" >
        <slot name="default"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";

export default {
  props: {
    modelValue: Boolean,
  },
  setup(props) {
    return {};
  },
};
</script>

<style scoped>
.fade-collapse-enter-active,
.fade-collapse-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-collapse-enter-from,
.fade-collapse-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
</style>
