<template>
  <transition
    :name="transition"
    @beforeLeave="beforeLeaveTransition"
  >
    <div
      v-show="tab.isActive.value"
      role="tabpanel"
      tabindex="0"
    >
      <!-- @slot name -->
      <slot
        v-if="false"
        name="name"
      ></slot>
      <!-- @slot default -->
      <slot name="default"></slot>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, toRef, useSlots } from "vue";

let props = defineProps({
  name: {
    type: String,
    default: undefined,
  },
});

let slots = useSlots()

let { addTab, removeTab, transition } = inject("_control-tab");

let tab = {
  isActive: ref(false),
  name: toRef(props, "name"),
  slots,
};

onMounted(() => addTab(tab));

onUnmounted(() => removeTab(tab));

// transition

let beforeLeaveTransition = (el) => {
  el.style.display = "none";
};
</script>

<style scoped>
.fade-leave-active,
.fade-side-slide-leave-active,
.fade-top-slide-leave-active {
  position: absolute;
}

.fade-enter-active {
  transition: opacity var(--tabs-transition-duration) ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-side-slide-enter-active {
  transition: opacity var(--tabs-transition-duration) ease,
    transform var(--tabs-transition-duration) ease;
}
.fade-side-slide-enter-from,
.fade-side-slide-leave-to {
  opacity: 0;
  transform: translateX(15px);
}

.fade-top-slide-enter-active {
  transition: opacity var(--tabs-transition-duration) ease,
    transform var(--tabs-transition-duration) ease;
}
.fade-top-slide-enter-from,
.fade-top-slide-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>
