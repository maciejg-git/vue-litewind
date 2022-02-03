<template>
  <div class="overflow-hidden">
    <transition
      name="fade-collapse"
      @enter="enter"
      @afterEnter="afterEnter"
      @afterLeave="afterLeave"
      @leave="leave"
    >
      <div v-show="isVisible">
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
  },
  setup(props, { emit }) {
    let { uid } = useUid();

    let accordion = inject("accordion", null);

    let isVisible = toRef(props, "modelValue");

    let collapse = () => emit("update:modelValue", false);

    onMounted(() => {
      if (accordion) {
        watch(
          isVisible,
          () => accordion.update(uid, isVisible.value, collapse),
          { immediate: true }
        );
      }
    });

    onUnmounted(() => {
      if (accordion) {
        if (isVisible.value) collapse();
        accordion.update(uid, false);
      }
    });

    let afterEnter = (element) => (element.style.height = "auto");

    let afterLeave = (element) => (element.style.height = "auto");

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
      isVisible,
      afterEnter,
      afterLeave,
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
