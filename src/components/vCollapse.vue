<template>
  <slot name="reference" :isOpen="isOpen" :onTrigger="onTrigger"></slot>

  <div class="overflow-hidden">
    <v-transition :name="transition">
      <div v-show="isOpen">
        <slot name="default"></slot>
      </div>
    </v-transition>
  </div>
</template>

<script>
// vue
import { ref, watch, onMounted, onUnmounted, inject } from "vue";
// components
import vTransition from "./vTransition.vue";
// props
import { defaultProps } from "../defaultProps";

export default {
  components: {
    vTransition,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: defaultProps("collapse", "transition", "fade-collapse-m"),
    },
  },
  setup(props, { emit }) {
    let isOpen = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (value) => (isOpen.value = value)
    );

    let uncollapse = () => {
      isOpen.value = true;
      emit("update:modelValue", true);
    };

    let collapse = () => {
      isOpen.value = false;
      emit("update:modelValue", false);
    };

    let toggleCollapse = () => {
      isOpen.value ? collapse() : uncollapse();
    };

    let onTrigger = {
      click: toggleCollapse,
    };

    // accordion

    let accordion = inject("accordion", null);

    let c = { isOpen, collapse };

    onMounted(() => {
      if (accordion) {
        watch(isOpen, () => accordion.update(c), {
          immediate: true,
        });
      }
    });

    onUnmounted(() => accordion && accordion.remove(c));

    return {
      isOpen,
      onTrigger,
    };
  },
};
</script>

<style scoped>
.fade-collapse-f-enter-active,
.fade-collapse-f-leave-active {
  transition: height 0.2s ease, opacity 0.2s ease;
  overflow: hidden;
}

.fade-collapse-m-enter-active,
.fade-collapse-m-leave-active {
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.fade-collapse-s-enter-active,
.fade-collapse-s-leave-active {
  transition: height 0.35s ease, opacity 0.35s ease;
  overflow: hidden;
}

.fade-collapse-f-enter-from,
.fade-collapse-f-leave-active,
.fade-collapse-m-enter-from,
.fade-collapse-m-leave-active,
.fade-collapse-s-enter-from,
.fade-collapse-s-leave-active {
  opacity: 0;
}
</style>
