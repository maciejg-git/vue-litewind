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

    // uid, toRaw, shallow concat new array
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
</style>
