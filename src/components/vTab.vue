<template>
  <transition
    :name="transition"
    @beforeLeave="beforeLeaveTransition"
  >
    <div v-show="tab.isActive.value">
      <slot v-if="false" name="name"></slot>
      <slot name="default"></slot>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, onUnmounted, inject, toRef } from "vue";

export default {
  props: {
    name: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    let tabs = inject("control-tab");

    let tab = { 
      isActive: ref(false), 
      name: toRef(props, "name"),
      slots
    }

    onMounted(() => tabs.addTab(tab));

    onUnmounted(() => tabs.removeTab(tab));

    // transition

    let beforeLeaveTransition = (el) => (el.style.display = "none");

    return {
      tab,
      transition: tabs.transition,
      beforeLeaveTransition,
    };
  },
};
</script>

<style scoped>
.fade-leave-active {
  position: absolute;
}
.fade-enter-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-side-slide-leave-active {
  position: absolute;
}
.fade-side-slide-enter-active {
  transition: opacity 0.8s ease, transform 0.4s ease;
}
.fade-side-slide-enter-from,
.fade-side-slide-leave-to {
  opacity: 0;
  transform: translateX(15px)
}

.fade-top-slide-leave-active {
  position: absolute;
}
.fade-top-slide-enter-active {
  transition: opacity 0.8s ease, transform 0.4s ease;
}
.fade-top-slide-enter-from,
.fade-top-slide-leave-to {
  opacity: 0;
  transform: translateY(15px)
}
</style>
