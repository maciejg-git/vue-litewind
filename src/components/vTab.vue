<template>
  <transition :name="noTransition ? 'no-transition' : 'fade-tab-content'">
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
    name: String,
  },
  setup(props) {
    let active = ref(false);
    let { addTab, removeTab } = inject("controlTab");
    let { noTransition } = inject("sharedProps");

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
      noTransition,
    };
  },
};
</script>

<style scoped>
.no-transtition-leave-active {
  position: absolute;
  display: none;
}
.fade-tab-content-leave-active {
  position: absolute;
  display: none;
}
.fade-tab-content-enter-active {
  transition: opacity 0.8s ease;
}
.fade-tab-content-enter-from,
.fade-tab-content-leave-to {
  opacity: 0;
}
</style>
