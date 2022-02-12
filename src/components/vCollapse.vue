<template>
  <div class="overflow-hidden">
    <transition
      :name="transition"
      @enter="enter"
      @afterEnter="afterTransition"
      @afterLeave="afterTransition"
      @leave="leave"
    >
      <div v-show="isOpen">
        <slot name="default"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { watch, toRef, onMounted, onUnmounted, inject } from "vue";
import useUid from "./composition/use-uid";

export default {
  props: {
    modelValue: { type: Boolean, default: false },
    transition: { type: String, default: "fade-collapse" },
  },
  setup(props, { emit }) {
    let { uid } = useUid();

    let accordion = inject("accordion", null);

    let isOpen = toRef(props, "modelValue");

    let collapse = () => emit("update:modelValue", false);

    onMounted(() => {
      if (accordion) {
        watch(
          isOpen,
          () => accordion.update(uid, isOpen.value, collapse),
          { immediate: true }
        );
      }
    });

    onUnmounted(() => {
      if (accordion) {
        if (isOpen.value) collapse();
        accordion.update(uid, false);
      }
    });

    let afterTransition = (element) => (element.style.height = "auto");

    let enter = (element) => {
      const { height } = getComputedStyle(element);
      element.style.height = 0;
      // trigger reflow
      let l = element.scrollHeight;
      element.style.height = height;
    };

    let leave = (element) => {
      const { height } = getComputedStyle(element);
      element.style.height = height;
      // trigger reflow
      let l = element.scrollHeight;
      element.style.height = 0;
    };

    return {
      isOpen,
      afterTransition,
      enter,
      leave,
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
