<template>
  <transition :name="transition" @beforeLeave="beforeLeaveTransition">
    <div v-show="tab.isActive.value">
      <slot v-if="false" name="name"></slot>
      <slot name="default"></slot>
    </div>
  </transition>
</template>

<script>
// vue
import { ref, onMounted, onUnmounted, inject, toRef } from "vue";

export default {
  props: {
    name: {
      type: String,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    let { addTab, removeTab, transition } = inject("control-tab");

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

    return {
      tab,
      transition,
      beforeLeaveTransition,
    };
  },
};
</script>

<style scoped>
.fade-leave-active,
.fade-side-slide-leave-active,
.fade-top-slide-leave-active {
  position: absolute;
}
</style>
