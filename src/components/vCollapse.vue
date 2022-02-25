<template>
  <div class="overflow-hidden">
    <transition
      :name="transition"
      @enter="enterTransition"
      @afterEnter="afterEnterTransition"
      @leave="leaveTransition"
    >
      <div v-show="isOpen">
        <slot name="default"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { watch, toRef, onMounted, onUnmounted, inject } from "vue";

export default {
  props: {
    modelValue: { type: Boolean, default: false },
    transition: { type: String, default: "fade-collapse" },
  },
  setup(props, { emit }) {
    let accordion = inject("accordion", null);

    let isOpen = toRef(props, "modelValue");

    let collapse = () => emit("update:modelValue", false);

    let c = { isOpen, collapse };

    onMounted(() => {
      if (accordion) {
        watch(isOpen, () => accordion.update(c), {
          immediate: true,
        });
      }
    });

    onUnmounted(() => accordion && accordion.remove(c));

    // transition

    let afterEnterTransition = (element) => (element.style.height = "auto");

    let enterTransition = (element) => {
      const { width } = getComputedStyle(element);

      element.style.width = width;
      element.style.position = "absolute";
      element.style.visibility = "hidden";
      element.style.height = "auto";

      const { height } = getComputedStyle(element);

      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = 0;

      // trigger reflow
      let l = element.scrollHeight;
      setTimeout(() => {
        element.style.height = height;
      });
    };

    let leaveTransition = (element) => {
      const { height } = getComputedStyle(element);

      element.style.height = height;

      // trigger reflow
      let l = element.scrollHeight;
      setTimeout(() => {
        element.style.height = 0;
      });
    };

    return {
      isOpen,
      afterEnterTransition,
      enterTransition,
      leaveTransition,
    };
  },
};
</script>

<style scoped>
.fade-collapse-enter-active,
.fade-collapse-leave-active {
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.fade-collapse-enter-from,
.fade-collapse-leave-active {
  opacity: 0;
}
</style>
