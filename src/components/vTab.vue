<template>
  <transition
    :name="transition == '' ? 'no-transition' : transition"
    @beforeLeave="beforeLeave"
  >
    <div v-show="active">
      <slot v-if="false" name="name"></slot>
      <slot name="default"></slot>
    </div>
  </transition>
</template>

<script>
import {
  ref,
  onMounted,
  onUnmounted,
  inject,
  getCurrentInstance,
  markRaw,
} from "vue";

export default {
  props: {
    name: { type: String, default: undefined },
  },
  setup() {
    let active = ref(false);
    let { addTab, removeTab } = inject("controlTab");
    let transition = inject("transition");

    let beforeLeave = (el) => (el.style.display = "none");

    onMounted(() => {
      addTab({
        active,
        instance: markRaw(getCurrentInstance()),
      });
    });

    onUnmounted(() => {
      removeTab(getCurrentInstance());
    });

    return {
      active,
      transition,
      beforeLeave,
    };
  },
};
</script>

<style scoped>
.no-transtition-leave-active {
  position: absolute;
}
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
