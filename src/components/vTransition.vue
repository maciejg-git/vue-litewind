<template>
  <transition
    :name="name"
    @enter="enterTransition"
    @afterEnter="afterEnterTransition"
    @leave="leaveTransition"
  >
  <!-- @slot default -->
    <slot name="default"></slot>
  </transition>
</template>

<script>
export default {
  props: {
    name: { type: String, default: "" },
  },
  setup() {
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
      afterEnterTransition,
      leaveTransition,
      enterTransition,
    };
  },
};
</script>

<style scoped>
</style>
